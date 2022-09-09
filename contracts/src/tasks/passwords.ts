import fs from "fs";
import { ethers } from "ethers";
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("passwords:generate", "Passwords")
  .addParam(
    "input",
    "Path to file that contains possible words",
    `${__dirname}/bip39.txt`,
    types.inputFile,
    true
  )
  .addParam(
    "output",
    "Output file path",
    `${__dirname}/passwords.out.txt`,
    types.string,
    true
  )
  .addParam("wordCount", "Number of words per password", 6, types.int, true)
  .addParam(
    "passwordCount",
    "Number of passwords to generate",
    50,
    types.int,
    true
  )
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const words = readWordsFile(taskArgs.input);

    let passwords = [];
    for (let i = 0; i < taskArgs.passwordCount; i++) {
      let password = [];
      for (let j = 0; j < taskArgs.wordCount; j++) {
        const k = randomInteger(words.length - 1);
        password.push(words[k]);
      }
      passwords.push(password.join(" "));
    }

    writePasswords(taskArgs.output, passwords);
  });

function readWordsFile(filePath: string): string[] {
  const data = fs.readFileSync(filePath, "utf8");
  return data.split("\n");
}

function writePasswords(filePath: string, passwords: string[]) {
  fs.writeFileSync(filePath, passwords.join("\n"), "utf8");
}

export function keccak256(input: string) {
  const toBytes = typeof input === "string" && !ethers.utils.isHexString(input);

  return ethers.utils.keccak256(
    toBytes ? ethers.utils.toUtf8Bytes(input) : input
  );
}

function randomInteger(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}
