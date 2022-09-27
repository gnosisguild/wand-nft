import { expect } from "chai";
import hre, { deployments } from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { Contract } from "ethers";
import { Incantation } from "../typechain-types";

describe("Incantation", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();

    const signers = await hre.ethers.getSigners();
    const [signer] = signers;
    const deployment = await deployments.get("Incantation");

    const incantation = new Contract(
      deployment.address,
      deployment.abi,
      signer
    ) as Incantation;

    return { incantation };
  });

  it("cycles through names", async () => {
    const { incantation } = await baseSetup();

    expect(await incantation.generate(1)).to.equal("WINGING BURNISHED BOWL");
    expect(await incantation.generate(2)).to.equal("INCREASING GLEAMING SCUD");
    expect(await incantation.generate(84)).to.equal("WINGING INFLAMED VAULT");
    expect(await incantation.generate(2397)).to.equal(
      "STRETCHING ROBUST PERIPHERY"
    );
    expect(await incantation.generate(6972)).to.equal("ANIMATE INFLAMED SCUD");

    expect(await incantation.generate(592620)).to.equal(
      await incantation.generate(0)
    );
  });
});
