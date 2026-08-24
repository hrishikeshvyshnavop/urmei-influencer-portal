type IconProps = {
  /** File name (without extension) under /public/assets/icons. */
  name: string
  /** Size of the icon slot, matching the frame the icon sits in in Figma. */
  size?: number
  /**
   * Slot size the SVG was exported at. Figma exports only the glyph's bounding
   * box, so the file's intrinsic size already encodes how much of its slot the
   * glyph fills — rendering it at the slot size would stretch it. Set this when
   * an icon is reused at a slot other than the one it came from.
   */
  srcSize?: number
  className?: string
}

/**
 * Icons are the SVGs exported from Figma, served as files. They carry their own
 * fill/stroke colour from the design, so pick the variant that matches the
 * surface (e.g. `plus` on light, `plus-inverse` on the dark primary button).
 */
export function Icon({ name, size = 16, srcSize, className = '' }: IconProps) {
  const scale = srcSize ? size / srcSize : 1
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-clip ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={`/assets/icons/${name}.svg`}
        alt=""
        style={scale === 1 ? undefined : { transform: `scale(${scale})` }}
      />
    </span>
  )
}
