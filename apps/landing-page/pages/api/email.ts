// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { GoogleSpreadsheet } = require("google-spreadsheet");

// This /api/email only supports POST requests.
// It takes in form encoded data with the field:
// email: an email address we can use to send updates.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const {
      body: { email },
    } = req;
    if (!email) {
      res.status(400).send("You must send an email address");
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

      const newRow = await greenListSheet.addRow({ email: email });

      res.status(200).send(`${email} added to list`);
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
