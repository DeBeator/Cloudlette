import type { SVGProps } from "react";

interface InstagramIconProps extends SVGProps<SVGSVGElement> {
  /** Width / height in pixels (mirrors the lucide `size` prop). Defaults to 24. */
  size?: number | string;
  /** Stroke width (mirrors the lucide `strokeWidth` prop). Defaults to 2. */
  strokeWidth?: number | string;
  /** Stroke / fill colour. Defaults to `currentColor`. */
  color?: string;
  className?: string;
}

/**
 * Standard Instagram glyph as an inline SVG.
 *
 * Accepts the same core props that lucide-react icons expose
 * (`className`, `size`, `strokeWidth`, `color`) so it can be used
 * as a drop-in replacement wherever the now-removed lucide `Instagram`
 * brand icon was used.
 */
export function InstagramIcon({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  className,
  style,
  ...rest
}: InstagramIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      {...rest}
    >
      {/* Outer rounded rectangle */}
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      {/* Centre circle */}
      <circle cx="12" cy="12" r="4" />
      {/* Top-right dot */}
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  );
}

