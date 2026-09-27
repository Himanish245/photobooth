// Canvas-based photo filter implementations
// Each filter takes an ImageData and modifies pixels in-place

export type FilterName =
  | "none"
  | "softPink"
  | "warmVintage"
  | "dreamyCream"
  | "strawberryTint"
  | "bwVintage";

export interface FilterOption {
  id: FilterName;
  name: string;
  label: string;
}

export const FILTERS: FilterOption[] = [
  { id: "none", name: "Original", label: "✨" },
  { id: "softPink", name: "Soft Pink", label: "🌸" },
  { id: "warmVintage", name: "Warm Vintage", label: "📷" },
  { id: "dreamyCream", name: "Dreamy Cream", label: "☁️" },
  { id: "strawberryTint", name: "Strawberry Tint", label: "🍓" },
  { id: "bwVintage", name: "B&W Vintage", label: "🖤" },
];

function clamp(value: number): number {
  return Math.max(0, Math.min(255, value));
}

export function applyFilter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  filter: FilterName
): void {
  if (filter === "none") return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  switch (filter) {
    case "softPink":
      applySoftPink(data);
      break;
    case "warmVintage":
      applyWarmVintage(data);
      break;
    case "dreamyCream":
      applyDreamyCream(data);
      break;
    case "strawberryTint":
      applyStrawberryTint(data);
      break;
    case "bwVintage":
      applyBwVintage(data, width, height);
      break;
  }

  ctx.putImageData(imageData, 0, 0);
}

function applySoftPink(data: Uint8ClampedArray): void {
  for (let i = 0; i < data.length; i += 4) {
    // Boost reds, slightly reduce blues, reduce saturation slightly
    data[i] = clamp(data[i] + 20); // R
    data[i + 1] = clamp(data[i + 1] + 5); // G
    data[i + 2] = clamp(data[i + 2] - 5); // B
    // Slight brightness boost
    data[i] = clamp(data[i] * 1.05);
    data[i + 1] = clamp(data[i + 1] * 1.02);
  }
}

function applyWarmVintage(data: Uint8ClampedArray): void {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Sepia tone
    data[i] = clamp(r * 0.393 + g * 0.769 + b * 0.189 + 20);
    data[i + 1] = clamp(r * 0.349 + g * 0.686 + b * 0.168 + 10);
    data[i + 2] = clamp(r * 0.272 + g * 0.534 + b * 0.131);

    // Warm curve boost
    data[i] = clamp(data[i] + 10);
    data[i + 1] = clamp(data[i + 1] + 5);
    // Slightly reduce contrast
    data[i] = clamp(128 + (data[i] - 128) * 0.9);
    data[i + 1] = clamp(128 + (data[i + 1] - 128) * 0.9);
    data[i + 2] = clamp(128 + (data[i + 2] - 128) * 0.9);
  }
}

function applyDreamyCream(data: Uint8ClampedArray): void {
  for (let i = 0; i < data.length; i += 4) {
    // High brightness, low contrast, warm tint
    data[i] = clamp(data[i] * 0.85 + 40); // R
    data[i + 1] = clamp(data[i + 1] * 0.85 + 35); // G
    data[i + 2] = clamp(data[i + 2] * 0.8 + 30); // B
    // Reduce contrast
    data[i] = clamp(128 + (data[i] - 128) * 0.8);
    data[i + 1] = clamp(128 + (data[i + 1] - 128) * 0.8);
    data[i + 2] = clamp(128 + (data[i + 2] - 128) * 0.8);
  }
}

function applyStrawberryTint(data: Uint8ClampedArray): void {
  for (let i = 0; i < data.length; i += 4) {
    // Rose/pink color overlay at low opacity
    const overlayR = 201; // strawberry red
    const overlayG = 76;
    const overlayB = 76;
    const opacity = 0.15;

    data[i] = clamp(data[i] * (1 - opacity) + overlayR * opacity);
    data[i + 1] = clamp(data[i + 1] * (1 - opacity) + overlayG * opacity);
    data[i + 2] = clamp(data[i + 2] * (1 - opacity) + overlayB * opacity);
    // Slight warmth
    data[i] = clamp(data[i] + 8);
    data[i + 1] = clamp(data[i + 1] - 3);
  }
}

function applyBwVintage(
  data: Uint8ClampedArray,
  width: number,
  height: number
): void {
  const cx = width / 2;
  const cy = height / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Desaturate to luminance
    const gray = r * 0.299 + g * 0.587 + b * 0.114;

    // Add slight grain
    const grain = (Math.random() - 0.5) * 15;

    data[i] = clamp(gray + grain + 5); // Slight warm tint
    data[i + 1] = clamp(gray + grain + 2);
    data[i + 2] = clamp(gray + grain);

    // Vignette effect
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    const vignette = 1 - (dist / maxDist) * 0.4;

    data[i] = clamp(data[i] * vignette);
    data[i + 1] = clamp(data[i + 1] * vignette);
    data[i + 2] = clamp(data[i + 2] * vignette);
  }
}

// Get CSS filter string for live preview (approximation of canvas filters)
export function getCSSFilter(filter: FilterName): string {
  switch (filter) {
    case "none":
      return "none";
    case "softPink":
      return "brightness(1.05) saturate(0.9) hue-rotate(-5deg)";
    case "warmVintage":
      return "sepia(0.4) brightness(1.05) contrast(0.9) saturate(0.85)";
    case "dreamyCream":
      return "brightness(1.15) contrast(0.8) saturate(0.7) sepia(0.1)";
    case "strawberryTint":
      return "brightness(1.02) hue-rotate(-10deg) saturate(1.1)";
    case "bwVintage":
      return "grayscale(1) contrast(1.1) brightness(1.05)";
    default:
      return "none";
  }
}
