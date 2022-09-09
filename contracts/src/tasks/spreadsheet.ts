import fs from "fs";
import path from "path";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const { GoogleSpreadsheet } = require("google-spreadsheet");

task(
  "spreadsheet:extract",
  "Reads reads a spreadsheet and extracts ethereum addresses and resolves ens names into an outputfile"
)
  .addParam(
    "output",
    "Path to output file. This will contain one address per line",
    `${__dirname}/addresses.out.txt`,
    types.string,
    true
  )
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    let rows = await readRows();
    const addressCount = rows.filter(({ address }) => address != null).length;
    const ensNameCount = rows.filter(({ ensName }) => ensName != null).length;

    console.info(`Found a total of ${rows.length} entries`);
    console.info(`\t${addressCount} are addresses `);
    console.info(`\t${ensNameCount} are maybe ENSNames`);

    rows = await resolveENSNames(hre, rows);

    const addresses = rows
      .filter((entry) => entry.address && isAddress(entry.address))
      .map((entry) => entry.address) as string[];

    writeAddresses(taskArgs.output, addresses);
    console.info(
      `Wrote ${addresses.length} addresses to ${path.resolve(taskArgs.output)}`
    );
  });

type Row = {
  address: string | null;
  ensName: string | null;
};

async function readRows(): Promise<Row[]> {
  const sheet = await loadSheet();
  const rows = await sheet.getRows();

  return rows
    .map((row: any) => row.address)
    .filter((text: any) => typeof text === "string")
    .filter((text: string) => !!text.trim())
    .map((text: string) => {
      return isAddress(text)
        ? { address: text, ensName: null }
        : { address: null, ensName: text };
    });
}

async function resolveENSNames(hre: HardhatRuntimeEnvironment, rows: Row[]) {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (row.ensName == null) {
      continue;
    }

    let resolvedAddress;
    try {
      resolvedAddress = await hre.ethers.provider.resolveName(row.ensName);
    } catch (e) {
      resolvedAddress = null;
    }

    if (resolvedAddress && isAddress(resolvedAddress)) {
      row.address = resolvedAddress;
      console.info(`Resolved ${row.ensName} as ${resolvedAddress}`);
    } else {
      console.info(`Failed to resolve ${row.ensName}`);
    }
  }
  return rows;
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

function writeAddresses(filePath: string, addresses: string[]) {
  fs.writeFileSync(filePath, addresses.join("\n"), "utf8");
}

export function keccak256(input: string) {
  const toBytes = typeof input === "string" && !ethers.utils.isHexString(input);

  return ethers.utils.keccak256(
    toBytes ? ethers.utils.toUtf8Bytes(input) : input
  );
}
