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
    const wand = await Wand.deploy([
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/background.png", // background
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/border.png", // border
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/birthchart_canvas.png", // background_canvas
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/environment.png", // environement
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/halo.png", // halo
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/sparkles.png", // sparkles
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/stone.png", // stone
      "https://cloudflare-ipfs.com/ipfs/QmenMC3y4DfpHX3mYjt7VJsHD6SxBmmLadnfgwQqpYG1SZ/wand_handle.png", // handle
    ]);
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
