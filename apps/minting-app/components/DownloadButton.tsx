import { transformForRendering, useAppContext } from "../state";
import IconButton from "./IconButton";
import useSeed from "./useSeed";
const template = require("../../../svg/template.svg.hbs");

export const FullDownloadButton = createDownloadButton({
  icon: "FullDownload",
  filename: "Wand.jpeg",
});

export const PFPDownloadButton = createDownloadButton({
  icon: "PfpDownload",
  asProfilePic: true,
  filename: "WandProfilePic.jpeg",
});

function createDownloadButton({
  icon,
  filename,
  asProfilePic = false,
}: {
  icon: "PfpDownload" | "FullDownload";
  filename: string;
  asProfilePic?: boolean;
}) {
  const DownloadButton = () => {
    const { state } = useAppContext();
    const seed = useSeed();

    return (
      <IconButton
        icon={icon}
        onClick={async () => {
          const { minting, tokenId, ...mintOptions } = state;

          const svg = template(
            transformForRendering(mintOptions, seed)
          ) as string;

          const hash = await sha256(svg);

          const params = new URLSearchParams({
            width: "1000",
            height: "1500",
            clipHeight: asProfilePic ? "1000" : "1500",
          });
          const response = await fetch(
            `https://nftgp.io/sha256:${hash}/${filename}?${params.toString()}`,
            {
              method: "POST",
              headers: new Headers({ "content-type": "image/svg+xml" }),
              body: svg,
            }
          );

          const url = window.URL.createObjectURL(await response.blob());
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />
    );
  };

  return DownloadButton;
}

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
