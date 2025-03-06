import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import unknownImg from "@/../public/IconUnknown.png";
// Todo
// Extend image props
interface Props {
  src: string | StaticImageData;
  alt: string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  fill?: boolean | undefined;
  quality?: number | `${number}` | undefined;
  priority?: boolean | undefined;
  loading?: "eager" | "lazy" | undefined;
  blurDataURL?: string | undefined;
  unoptimized?: boolean | undefined;
  overrideSrc?: string | undefined;
  layout?: string | undefined;
  objectFit?: string | undefined;
  objectPosition?: string | undefined;
  lazyBoundary?: string | undefined;
  lazyRoot?: string | undefined;
  className?: string | undefined;
  fallbackImageUrl?: string | StaticImageData;
}

const ImageWithFallback = (props: Props) => {
  let { fallbackImageUrl } = props;
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState<string | StaticImageData | undefined>(
    undefined,
  );
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  const imgProps = { ...rest };
  fallbackImageUrl = unknownImg as string | StaticImageData;
  delete imgProps.fallbackImageUrl;
  if (imgSrc) {
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <Image
        {...imgProps}
        src={imgSrc}
        onError={() => {
          setImgSrc(fallbackImageUrl);
        }}
      />
    );
  }
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...imgProps}
      src={src}
      onError={() => {
        setImgSrc(fallbackImageUrl);
      }}
    />
  );
};

export default ImageWithFallback;
