import fs from "fs";
import { task, types } from "hardhat/config";

task("passwords:generate", "Passwords")
  .addParam(
    "input",
    "Path to file that contains possible words",
    `${__dirname}/bip39.txt`,
    types.inputFile
  )

  .addParam("wordCount", "Number of words per password", 6, types.int)
  .addParam("outputCount", "Number of passwords to generate", 50, types.int)
  .addParam(
    "output",
    "Output file path",
    `${__dirname}/passwords.out.txt`,
    types.string
  )
  .setAction(async (taskArgs) => {
    const words = fs.readFileSync(taskArgs.input, "utf8").split("\n");

    const passwords = [];
    for (let i = 0; i < taskArgs.outputCount; i++) {
      passwords.push(password(words, taskArgs.wordCount));
    }

    fs.writeFileSync(taskArgs.output, passwords.join("\n"), "utf8");
    console.info(
      `Generated ${taskArgs.outputCount} passwords of ${taskArgs.wordCount} words each.`
    );
    console.info(`Output at ${taskArgs.output}`);
  });

function password(words: string[], wordCount: number) {
  const result = [];
  for (let j = 0; j < wordCount; j++) {
    let word;
    do {
      word = words[randomInteger(words.length - 1)];
    } while (result.indexOf(word) !== -1);

    result.push(word);
  }
  return result.join(" ");
}

function randomInteger(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}
