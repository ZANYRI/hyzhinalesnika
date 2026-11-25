import Image, { type ImageProps } from "next/image";
import { seasonalImage } from "@/lib/season";

// Both server pages and client galleries resolve the same build-time season.
export default function SeasonalImage({ src, alt, ...props }: ImageProps) {
  return <Image {...props} alt={alt} src={typeof src === "string" ? seasonalImage(src) : src} />;
}
