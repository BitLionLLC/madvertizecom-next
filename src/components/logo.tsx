import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const variants = {
  /** The "MAD" mark on its own — legible at nav sizes. */
  mark: { src: "/mad.png", width: 462, height: 293 },
  /** The full stacked lockup; needs room to read. */
  full: { src: "/madvertize.png", width: 390, height: 334 },
} as const;

export function Logo({
  variant = "mark",
  className,
  imageClassName = "h-11 w-auto",
  priority = false,
}: {
  variant?: keyof typeof variants;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const image = variants[variant];

  return (
    <Link
      href="/"
      className={cn("inline-block shrink-0", className)}
      aria-label={`${site.name} — home`}
    >
      <Image
        src={image.src}
        alt={site.name}
        width={image.width}
        height={image.height}
        priority={priority}
        className={imageClassName}
      />
    </Link>
  );
}
