import { WandTokenData } from "../types";

const getDataFromUri = (tokenUri: string): WandTokenData => {
  const buff = Buffer.from(
    tokenUri.slice("data:application/json;base64,".length),
    "base64"
  );
  const json = buff.toString("utf-8");
  if (!json) return {} as WandTokenData;
  return JSON.parse(json);
};

export default getDataFromUri;
