import { useAppContext } from "../state";
import IconButton from "./IconButton";
import useSeed from "./useSeed";

export const FullDownloadButton = createDownloadButton({
  icon: "FullDownload",
  filename: "Wand.jpeg",
});

export const PFPDownloadButton = createDownloadButton({
  icon: "PfpDownload",
  filename: "WandProfilePic.jpeg",
});

function createDownloadButton({
  icon,
  filename,
}: {
  icon: "PfpDownload" | "FullDownload";
  filename: string;
}) {
  const DownloadButton = () => {
    const { state } = useAppContext();
    const seed = useSeed();

    return (
      <IconButton
        icon={icon}
        onClick={() => {
          const { minting, tokenId, ...mintOptions } = state;

          const params = new URLSearchParams({
            isProfilePic: icon === "PfpDownload" ? "true" : "false",
            mintOptions: JSON.stringify(mintOptions),
            seed: seed.toString(),
          });

          fetch(`/api/thumbnail?${params.toString()}`).then(
            async (response) => {
              const url = window.URL.createObjectURL(await response.blob());
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", filename);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          );
        }}
      />
    );
  };

  return DownloadButton;
}
