import assert from "assert";
import { ethers } from "ethers";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import MerkleTree from "merkletreejs";

const { GoogleSpreadsheet } = require("google-spreadsheet");

task(
  "proofdb:clean",
  "Cleans the proof and leaf columns from the proof spreadsheet"
).setAction(async (_, hre: HardhatRuntimeEnvironment) => {
  const rows = await resolveENSNames(await readRows());
  await writeClean(rows);
});

task(
  "proofdb:populate",
  "Recalculates MerkleTree and populates proof and leaf columns of proof spreadsheet"
).setAction(async (_, hre: HardhatRuntimeEnvironment) => {
  const rows = await resolveENSNames(await readRows());
  const merkleTree = createMerkleTree(rows);
  await writePopulate(rows, merkleTree);
});

task(
  "proofdb:print",
  "Recalculates MerkleTree from spreadsheet columns and prints MerkleRoot"
).setAction(async (_, hre: HardhatRuntimeEnvironment) => {
  const rows = await resolveENSNames(await readRows());
  const merkleTree = createMerkleTree(rows);
  console.info(`MerkleRoot: ${merkleTree.getHexRoot()}`);
});

export async function populate(hre: HardhatRuntimeEnvironment) {
  let rows = await readRows();
  rows = await resolveENSNames(rows);
  const merkleTree = createMerkleTree(rows);
  await writePopulate(rows, merkleTree);
  return merkleTree;
}

export async function calculateRootHash(hre: HardhatRuntimeEnvironment) {
  let rows = await readRows();
  rows = await resolveENSNames(rows);
  const merkleTree = createMerkleTree(rows);
  return merkleTree.getHexRoot();
}

type Row = {
  index: number;
  phrase: string;
  address?: string;
  leaf?: string;
  proof?: string;
};

async function readRows(): Promise<Row[]> {
  const sheet = await loadSheet();
  const rows = await sheet.getRows();

  return rows.map((row: any) => ({
    index: row._rowNumber - 1,
    phrase: row.phrase,
    address: row.address,
  }));
}

async function writePopulate(rows: Row[], merkleTree: MerkleTree) {
  const sheet = await loadSheet();
  const { leafColumnIndex, proofColumnIndex } = await columnIndices(
    sheet,
    rows
  );

  for (let i = 0; i < rows.length; i++) {
    const { index, address, phrase } = rows[i];
    const leaf = keccak256(address || phrase);
    const proof = merkleTree.getHexProof(leaf);
    assert(
      proof.length > 0,
      "Proof DB: could not retrieve proof from generated MerkleTree"
    );

    const leafCell = sheet.getCell(index, leafColumnIndex);
    const proofCell = sheet.getCell(index, proofColumnIndex);
    leafCell.value = leaf;
    proofCell.value = JSON.stringify(proof);
  }
  await sheet.saveUpdatedCells();
}

async function writeClean(rows: Row[]) {
  const sheet = await loadSheet();
  const { leafColumnIndex, proofColumnIndex } = await columnIndices(
    sheet,
    rows
  );

  for (let i = 0; i < rows.length; i++) {
    const { index } = rows[i];
    const leafCell = sheet.getCell(index, leafColumnIndex);
    const proofCell = sheet.getCell(index, proofColumnIndex);
    leafCell.value = "";
    proofCell.value = "";
  }
  await sheet.saveUpdatedCells();
}

async function resolveENSNames(rows: Row[]) {
  return rows.map((row) => ({
    ...row,
    address: ethers.utils.isAddress(row.address || "")
      ? row.address
      : undefined,
  }));
}

function createMerkleTree(rows: Row[]): MerkleTree {
  const leaves = rows.map((row) => row.address || row.phrase);
  return new MerkleTree(leaves, keccak256, {
    sortPairs: true,
    hashLeaves: true,
  });
}

async function loadSheet() {
  const doc = new GoogleSpreadsheet(process.env["SPREADSHEET_ID"]);

  await doc.useServiceAccountAuth({
    client_email: process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"],
    private_key: process.env["GOOGLE_PRIVATE_KEY"]?.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

async function columnIndices(sheet: any, rows: Row[]) {
  const remoteRows = await sheet.getRows();

  for (let i = 0; i < rows.length; i++) {
    assert(
      rows[i].index === remoteRows[i]._rowNumber - 1 &&
        rows[i].phrase === remoteRows[i].phrase,
      "Proof DB: read write mismatch"
    );
  }

  const leafColumnIndex = sheet.headerValues.indexOf("leaf");
  const proofColumnIndex = sheet.headerValues.indexOf("proof");

  assert(leafColumnIndex !== -1, "Proof DB: couldn't find leaf column index");
  assert(proofColumnIndex !== -1, "Proof DB: couldn't find proof column index");

  await sheet.loadCells();

  return { leafColumnIndex, proofColumnIndex };
}

export function keccak256(input: string) {
  const toBytes = typeof input === "string" && !ethers.utils.isHexString(input);

  return ethers.utils.keccak256(
    toBytes ? ethers.utils.toUtf8Bytes(input) : input
  );
}
