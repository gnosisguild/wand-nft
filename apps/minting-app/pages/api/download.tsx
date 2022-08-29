import { NextApiRequest, NextApiResponse } from "next";
import { transformForRendering } from "../../state";
import { Viewport, ScreenshotClip } from "puppeteer-core/lib/types";

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const template = require("../../../../svg/template.svg.hbs");

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const isProfilePic = request.query.isProfilePic === "true";
  const seed = parseInt(request.query.seed as string);
  const mintOptions = JSON.parse(request.query.mintOptions as string);

  const filePath = path.join(process.cwd(), "in.svg");
  const svg = template(transformForRendering(mintOptions, seed));
  fs.writeFileSync(filePath, svg, "utf8");

  // note use the specified 2000 x 3000 makes the screenshot much slower to produce
  const viewport = isProfilePic
    ? { width: 1000, height: 1500 }
    : //: { width: 2000, height: 3000 };
      { width: 1000, height: 1500 };
  const clip = isProfilePic
    ? { x: 0, y: 0, width: 1000, height: 1000 }
    : undefined;

  const result = await screenshot(`file://${filePath}`, viewport, clip);
  response.status(200).setHeader("Content-Type", "image/jpeg").send(result);

  fs.unlinkSync(filePath);
}

async function screenshot(
  url: string,
  viewport: Viewport,
  clip?: ScreenshotClip
) {
  const options = (await chrome.executablePath)
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto(url);
  const result = await page.screenshot({ type: "jpeg", clip });
  await browser.close();
  return result;
}
