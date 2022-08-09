import { readdirSync, readFileSync } from "fs";
import path from "path";

import { BigNumber, FixedNumber } from "ethers";
import Handlebars from "handlebars";

import { TemplateInput } from "../../apps/minting-app/types";

const partialFiles = readdirSync(
  path.join(__dirname, "..", "..", "svg", "partials"),
  {
    withFileTypes: true,
  }
);
partialFiles.forEach((file) => {
  const partialText = readFileSync(
    path.join(__dirname, "..", "..", "svg", "partials", file.name),
    {
      encoding: "utf8",
      flag: "r",
    }
  );
  Handlebars.registerPartial(
    file.name.replace(".hbs", ""),
    partialText.replace(/\s+/g, " ")
  );
});

const templateText = readFileSync(
  path.join(__dirname, "..", "..", "svg", "template.svg.hbs"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

const toFixed = (value: BigNumber, decimals: number) => {
  if (decimals === 0) return value.toString();

  const fixedNumber = FixedNumber.fromValue(value, decimals).toString();
  const [integral, fractional] = fixedNumber.split(".");
  return `${integral}.${fractional.padEnd(decimals, "0")}`;
};

const intHelper = (arg: any, { hash }: any) => {
  const { decimals = 0 } = hash;
  return toFixed(BigNumber.from(arg), decimals);
};
Handlebars.registerHelper("int", intHelper);
Handlebars.registerHelper("uint", intHelper);
for (let i = 8; i <= 256; i += 8) {
  Handlebars.registerHelper(`int${i}`, intHelper);
  Handlebars.registerHelper(`uint${i}`, intHelper);
}

export default Handlebars.compile<TemplateInput>(
  templateText.replace(/\s+/g, " ")
);
