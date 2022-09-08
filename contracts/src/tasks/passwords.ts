import fs from "fs";
import { ethers } from "ethers";
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("passwords:generate", "Passwords")
  .addParam(
    "wordsFilePath",
    "Path to file that contains all possible words",
    `${__dirname}/bip39.txt`,
    types.inputFile,
    true
  )
  .addParam("wordCount", "Number of words per password", 4, types.int, true)
  .addParam(
    "outputFilePath",
    "Path to file that will contain generated passwords",
    `${__dirname}/passwords.out.txt`,
    types.string,
    true
  )
  .addParam(
    "outputCount",
    "Number of passwords generated",
    100,
    types.int,
    true
  )
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const words = readWordsFile(
      taskArgs.wordsFilePath || `${__dirname}/bip39.txt`
    );

    let result = [];
    for (let i = 0; i < taskArgs.outputCount; i++) {
      let password = [];
      for (let j = 0; j < taskArgs.wordCount; j++) {
        const k = randomInteger(words.length - 1);
        password.push(words[k]);
      }
      result.push(password.join(" "));
    }

    writePasswords(taskArgs.outputFilePath, result);
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
