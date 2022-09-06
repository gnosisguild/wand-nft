import assert from "assert";
import fs from "fs";
import path from "path";

import { getAddress } from "ethers/lib/utils";
import hre from "hardhat";
import { calculateRootHash } from "../tasks/proofdb";

const alreadyVerifiedError = "Contract source code already verified";
const sameBytecodeError =
  "The verification may still succeed but should be checked manually.";

function readDeploymentAddress(artifact: string) {
  const filePath = path.resolve(
    path.join(
      __dirname,
      "..",
      "..",
      "deployments",
      hre.network.name,
      `${artifact}.json`
    )
  );

  assert(fs.existsSync(filePath), `No deployment file exists for ${artifact}`);

  const data = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(data);

  assert(!!getAddress(parsed.address), `Wrong format for ${artifact}`);

  return getAddress(parsed.address);
}

async function verify(): Promise<void> {
  if (hre.network.name === "hardhat") {
    console.error("Specify network with --network");
    process.exit(1);
  }

  const BackgroundLayer = readDeploymentAddress("BackgroundLayer");
  const Conjuror = readDeploymentAddress("Conjuror");
  const Forge = readDeploymentAddress("Forge");
  const FrameLayer = readDeploymentAddress("FrameLayer");
  const HandleLayer = readDeploymentAddress("HandleLayer");
  const Cauldron = readDeploymentAddress("Cauldron");
  const Incantation = readDeploymentAddress("Incantation");
  const ZodiacWands = readDeploymentAddress("ZodiacWands");

  try {
    await hre.run("verify:verify", {
      address: HandleLayer,
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`HandleLayer already verified`);
    } else {
      throw e;
    }
  }

  try {
    await hre.run("verify:verify", {
      address: FrameLayer,
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`FrameLayer already verified`);
    } else {
      throw e;
    }
  }

  try {
    await hre.run("verify:verify", {
      address: BackgroundLayer,
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`BackgroundLayer already verified`);
    } else {
      throw e;
    }
  }

  try {
    await hre.run("verify:verify", {
      address: Cauldron,
      libraries: {
        HandleLayer,
        FrameLayer,
        BackgroundLayer,
      },
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`Cauldron already verified`);
    } else {
      throw e;
    }
  }

  try {
    await hre.run("verify:verify", {
      address: Incantation,
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`Incantation already verified`);
    } else {
      throw e;
    }
  }

  try {
    await hre.run("verify:verify", {
      address: Conjuror,
      libraries: {
        Cauldron,
        Incantation,
      },
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`Conjuror already verified`);
    } else {
      throw e;
    }
  }

  // Note Decanter gets inlined
  const rootHash = await calculateRootHash(hre);
  try {
    await hre.run("verify:verify", {
      address: ZodiacWands,
      constructorArguments: [Conjuror, rootHash],
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`ZodiacWands already verified`);
    } else {
      throw e;
    }
  }

  try {
    await hre.run("verify:verify", {
      address: Forge,
      constructorArguments: [ZodiacWands],
    });
  } catch (e: any) {
    if (
      e.message === alreadyVerifiedError ||
      e.message.includes(sameBytecodeError)
    ) {
      console.warn(`Forge already verified`);
    } else {
      throw e;
    }
  }
}

verify();

export default verify;
