import Image from "next/image";
import wandContract from "../../utils/contract";
import { useMemo } from "react";

const WandImage: React.FC<{
  tokenUri: string;
  tokenId: number;
  width: number;
}> = ({ tokenUri, tokenId, width }) => {
  const obj = useMemo(() => {
    const json = atob(tokenUri.slice("data:application/json;base64,".length));
    if (!json) return {};
    return JSON.parse(json);
  }, [tokenUri]);

  const { chainId, address } = wandContract;
  const filename = obj.name.toLowerCase().replace(/ /g, "-");
  const width2x = width * 2; // fetch file with 4x resolution for good results on retina displays
  return (
    <Image
      src={`https://nftgp.io/nft://${chainId}/${address}/${tokenId}/${filename}.jpg?width=${width2x}`}
      alt={obj.name}
      width={width}
      height={(width / 2) * 3}
      unoptimized
    />
  );
};

export default WandImage;
