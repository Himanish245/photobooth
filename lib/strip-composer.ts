// Photo strip canvas composition
// Composes 3 or 4 captured photos into a vertical strip layout

import { type FilterName, applyFilter } from "./filters";
import { type FrameName, drawFrame } from "./frames";

export interface StripPhoto {
  dataUrl: string;
  filter: FilterName;
  frame: FrameName;
}

interface StripOptions {
  photos: StripPhoto[];
  caption?: string;
  date?: string;
  stripWidth?: number;
}

const PHOTO_PADDING = 12;
const STRIP_PADDING = 20;
const CAPTION_HEIGHT = 60;
const PHOTO_ASPECT = 4 / 3; // Width/height ratio per photo

export async function composeStrip(options: StripOptions): Promise<string> {
  const {
    photos,
    caption = "Our Little Photobooth ♡",
    date = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    stripWidth = 400,
  } = options;

  const photoWidth = stripWidth - STRIP_PADDING * 2;
  const photoHeight = photoWidth / PHOTO_ASPECT;
  const totalHeight =
    STRIP_PADDING * 2 +
    photos.length * photoHeight +
    (photos.length - 1) * PHOTO_PADDING +
    CAPTION_HEIGHT;

  const canvas = document.createElement("canvas");
  canvas.width = stripWidth;
  canvas.height = totalHeight;
  const ctx = canvas.getContext("2d")!;

  // Strip background - cream with subtle texture feel
  ctx.fillStyle = "#FFF8F0";
  ctx.fillRect(0, 0, stripWidth, totalHeight);

  // Outer border
  ctx.strokeStyle = "#F4C2C2";
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, stripWidth - 8, totalHeight - 8);

  // Inner decorative border
  ctx.strokeStyle = "#E8A0BF";
  ctx.lineWidth = 0.5;
  ctx.setLineDash([3, 3]);
  ctx.strokeRect(8, 8, stripWidth - 16, totalHeight - 16);
  ctx.setLineDash([]);

  // Draw each photo
  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const x = STRIP_PADDING;
    const y = STRIP_PADDING + i * (photoHeight + PHOTO_PADDING);

    // Load image
    const img = await loadImage(photo.dataUrl);

    // Draw photo
    ctx.save();
    ctx.drawImage(img, x, y, photoWidth, photoHeight);

    // Apply filter
    if (photo.filter !== "none") {
      applyFilter(ctx, stripWidth, totalHeight, photo.filter);
    }

    // Draw frame
    if (photo.frame !== "none") {
      ctx.save();
      ctx.translate(x, y);
      drawFrame(ctx, photoWidth, photoHeight, photo.frame);
      ctx.restore();
    }

    ctx.restore();
  }

  // Caption area
  const captionY =
    STRIP_PADDING +
    photos.length * photoHeight +
    (photos.length - 1) * PHOTO_PADDING +
    10;

  // Caption text
  ctx.fillStyle = "#8B3A5C";
  ctx.font = "italic 16px 'Dancing Script', cursive";
  ctx.textAlign = "center";
  ctx.fillText(caption, stripWidth / 2, captionY + 20);

  // Date
  ctx.fillStyle = "#6B4C3B";
  ctx.font = "11px 'Inter', sans-serif";
  ctx.fillText(date, stripWidth / 2, captionY + 40);

  // Small decorative elements
  ctx.font = "10px serif";
  ctx.fillText("🍓", STRIP_PADDING + 5, captionY + 30);
  ctx.fillText("🌸", stripWidth - STRIP_PADDING - 5, captionY + 30);

  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
