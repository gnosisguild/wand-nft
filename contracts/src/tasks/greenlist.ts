import fs from "fs";
import path from "path";
import { ethers } from "ethers";
import { task, types } from "hardhat/config";
import MerkleTree from "merkletreejs";

import { isAddress, keccak256 } from "ethers/lib/utils";
import assert from "assert";

task(
  "greenlist:generate",
  "Computes or expands a MerkleTree and writes it to a json file"
)
  .addParam(
    "input",
    "Path to file that contains the previous MerkleProofs to expand on",
    undefined,
    types.string,
    true
  )
  .addParam(
    "addresses",
    "Path to file a text file containing one ethereum address per line. These will be added as direct permits",
    `${__dirname}/addresses.in.txt`,
    types.inputFile,
    true
  )
  .addParam(
    "passwords",
    "Path to file a text file containing one password per line. These will be used to add wildcard permits",
    `${__dirname}/passwords.in.txt`,
    types.inputFile,
    true
  )
  .addParam(
    "output",
    "Path to the output file",
    `${__dirname}/greenlist.out.json`,
    types.string,
    true
  )
  .setAction(async (taskArgs) => {
    const prevLeaves = loadPrevLeaves(taskArgs.input);
    const directAddresses = loadDirectPermits(taskArgs.addresses);
    const wildcardAddresses = loadWildcardPermits(taskArgs.passwords);

    const nextLeaves = [...directAddresses, ...wildcardAddresses].map(
      (address) => {
        assert(isAddress(address));
        return keccak256(address);
      }
    );

    writeProofs(taskArgs.output, createNextMerkleTree(prevLeaves, nextLeaves));
    console.info(
      `Wrote updated proofs file at ${path.resolve(taskArgs.output)}`
    );
  });

function createNextMerkleTree(prevLeaves: string[], nextLeaves: string[]) {
  const repeated = nextLeaves.some(
    (leaf) => prevLeaves.includes(leaf) === true
  );
  if (repeated) {
    console.error("Some new leaves are already in previous tree");
    process.exit(1);
  }

  return new MerkleTree([...prevLeaves, ...nextLeaves], keccak256, {
    hashLeaves: false,
    sortPairs: true,
  });
}

function loadDirectPermits(filePath: string): string[] {
  if (!filePath || !fs.existsSync(filePath)) {
    console.info("Not adding Direct Permits");
    return [];
  }

  const data = fs.readFileSync(filePath, "utf8");
  const addresses = data.split("\n");

  const badAddresses = addresses.filter((address) => !isAddress(address));
  if (badAddresses.length) {
    console.error("Direct Permits file contains malformed addresses:");
    console.error(badAddresses.map((a) => `\t${a}`).join("\n"));
    process.exit(1);
  }

  return addresses;
}

function loadWildcardPermits(filePath: string): string[] {
  if (!filePath || !fs.existsSync(filePath)) {
    console.info("Not adding Wildcard Permits");
    return [];
  }

  const data = fs.readFileSync(filePath, "utf8");
  const passwords = data.split("\n");

  return passwords
    .map(
      (password) =>
        new ethers.Wallet(
          ethers.utils.keccak256(ethers.utils.toUtf8Bytes(password))
        )
    )
    .map((wallet) => wallet.address);
}

type JsonProofs = {
  root: string;
  proofs: { leaf: string; proof: string[] }[];
};

function loadPrevLeaves(filePath: string): string[] {
  if (!filePath || !fs.existsSync(filePath)) {
    console.info("No Current Proofs file provided");
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  const json = validateJsonProofsIntegrity(JSON.parse(data));

  return json.proofs.map((proof) => proof.leaf);
}

function validateJsonProofsIntegrity(json: JsonProofs) {
  const leaves = json.proofs.map((p) => p.leaf);

  const tree = new MerkleTree(leaves, keccak256, {
    hashLeaves: false,
    sortPairs: true,
  });

  assert(tree.getHexRoot() === json.root, "Corrupted json proofs file");

  return json;
}

function writeProofs(filePath: string, tree: MerkleTree) {
  const leaves = tree.getHexLeaves();
  const root = tree.getHexRoot();

  const result = {
    root,
    proofs: leaves.map((leaf) => ({ leaf, proof: tree.getHexProof(leaf) })),
  };

  fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf8");
}
