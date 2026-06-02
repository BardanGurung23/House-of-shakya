export const hexToRgba = (
  color: string | null | undefined,
  opacity: number | string | null | undefined,
) => {
  const fallbackColor = "#00152f";
  const rawColor = color?.trim() || fallbackColor;
  const parsedOpacity = Number(opacity ?? 0.45);
  const alpha = Number.isFinite(parsedOpacity)
    ? Math.min(Math.max(parsedOpacity, 0), 1)
    : 0.45;

  if (/^#[0-9a-f]{6}$/i.test(rawColor)) {
    const red = parseInt(rawColor.slice(1, 3), 16);
    const green = parseInt(rawColor.slice(3, 5), 16);
    const blue = parseInt(rawColor.slice(5, 7), 16);

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  return `rgba(0, 21, 47, ${alpha})`;
};

export const getBannerOverlayBackground = ({
  type,
  color,
  opacity,
  direction,
  gradientStop = "80%",
}: {
  type?: string | null;
  color?: string | null;
  opacity?: number | string | null;
  direction?: string | null;
  gradientStop?: string;
}) => {
  const overlayColor = hexToRgba(color, opacity);

  if (type === "solid") {
    return overlayColor;
  }

  return `linear-gradient(${direction?.trim() || "to right"}, ${overlayColor}, transparent ${gradientStop})`;
};
