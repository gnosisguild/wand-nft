import React from "react";

interface Props {
  className?: string;
  src?: string;
  alt?: string;
}

const FrameImage: React.FC<Props> = ({ className, src, alt, ...props }) => {
  return <img className={className} src={src} alt={alt} {...props} />;
};

export default React.memo(FrameImage);
