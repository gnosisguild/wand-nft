import { expect } from "chai";
import hre, { deployments, waffle, ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

const ZeroState =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const ZeroAddress = "0x0000000000000000000000000000000000000000";
const FirstAddress = "0x0000000000000000000000000000000000000001";

describe("GuildWand", async () => {
  const baseSetup = deployments.createFixture(async () => {
    await deployments.fixture();
    const Wand = await hre.ethers.getContractFactory("Wand");
    const wand = await Wand.deploy();
    await wand.initAssets(0, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/background.png");
    await wand.initAssets(1, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/border.png");
    await wand.initAssets(2, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/birthchart_canvas.png");
    await wand.initAssets(3, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/environment.png");
    await wand.initAssets(4, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/halo.png");
    await wand.initAssets(5, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/sparkles.png");
    await wand.initAssets(6, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/stone.png");
    await wand.initAssets(7, "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/wand_handle.png");
    await wand.mintWand();
    return { Wand, wand };
  });

  const [user1] = waffle.provider.getWallets();

  describe("initialize", async () => {
    it("should initialize NFT contract", async () => {
      const { wand } = await baseSetup();
      const uri = await wand.tokenURI(0);
      console.log(uri);
    });
  });
});
