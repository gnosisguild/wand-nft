import { NextApiRequest, NextApiResponse } from "next";

const { GoogleSpreadsheet } = require("google-spreadsheet");

import assert from "assert";
import { ethers } from "ethers";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (typeof request.body !== "string") {
    response.status(200).setHeader("Content-Type", "application/json").send([]);
    return;
  }

  const rows = await loadRows();
  const leaf = keccak256(request.body);
  const hit = rows.find((row) => row.leaf === leaf);

  response
    .status(200)
    .setHeader("Content-Type", "application/json")
    .send(hit ? hit.proof : []);
}

async function loadRows(): Promise<{ leaf: string; proof: string[] }[]> {
  const doc = new GoogleSpreadsheet(process.env["SPREADSHEET_ID"]);

  await doc.useServiceAccountAuth({
    client_email: process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"],
    private_key: process.env["GOOGLE_PRIVATE_KEY"]?.replace(/\\n/g, "\n"),
  });
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  return rows.map((row: any) => ({
    leaf: row.leaf,
    proof: JSON.parse(row.proof),
  }));
}

export function keccak256(input: string) {
  const toBytes = typeof input === "string" && !ethers.utils.isHexString(input);

  return ethers.utils.keccak256(
    toBytes ? ethers.utils.toUtf8Bytes(input) : input
  );
}
