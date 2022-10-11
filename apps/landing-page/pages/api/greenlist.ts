// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { GoogleSpreadsheet } = require("google-spreadsheet");

// This /api/greenlist/ only supports POST requests.
// It takes in form encoded data with the fields:
// phrase: the password given to a person to register for the greenlist
// address: the account address the person wants to greenlist
// email: (optional) an email address we can use to send updates.
//
// This api uses a spreadsheet of password phrases as a backend, and
// checks incoming requests against the existing list of phrases in the
// spreadsheet.
//
// Behaviors:
// If a password phrase has already been used: return 404
// If a password phrase is not in the spreadsheet: return 404
// If no address is provided: return 400
// If valid pw phrase and address: update spreadsheet and return 200

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    // save address to spreadsheet
    const {
      body: { phrase, address, email },
    } = req;
    console.log(phrase, address);
    if (!address) {
      res.status(400).send("You must send an ETH address to greenlist");
      return;
    }

    try {
      const doc = new GoogleSpreadsheet(
        process.env[getEnvVar("SPREADSHEET_ID")]
      );
      await doc.useServiceAccountAuth({
        client_email: process.env[getEnvVar("GOOGLE_SERVICE_ACCOUNT_EMAIL")],
        private_key: process.env[getEnvVar("GOOGLE_PRIVATE_KEY")]?.replace(
          /\\n/g,
          "\n"
        ),
      });
      await doc.loadInfo();
      const greenListSheet = doc.sheetsByIndex[0];
      const rows = await greenListSheet.getRows();

      // find phrase in row, if exists and not locked, add address
      const phraseIndex = rows.findIndex(
        (row: any) => row["_rawData"][0] === phrase
      );

      if (phraseIndex === -1) {
        // return 404 if phrase is not found
        res.status(404).send("Not found");
        return;
      }

      if (rows[phraseIndex].used) {
        // return 404 if phrase is already used
        res.status(409).send("Incantation already claimed");
        return;
      }

      rows[phraseIndex].address = address;
      rows[phraseIndex].used = "yes";
      rows[phraseIndex].email = email;
      await rows[phraseIndex].save();

      res.status(200).send(`${address} added to the greenlist`);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  } else {
    res.status(404).send("Not found");
  }
}

function getEnvVar(varName: string): string {
  if (process.env.NODE_ENV === "production") {
    return `PROD_${varName}`;
  }
  return `DEV_${varName}`;
}
