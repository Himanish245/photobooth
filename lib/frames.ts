// Frame types and drawing logic for photobooth frames

export type FrameName =
  | "none"
  | "strawberryPatisserie"
  | "lilyGarden"
  | "pinkRibbon"
  | "frenchBakery"
  | "vintageCoquette";

export interface FrameOption {
  id: FrameName;
  name: string;
  label: string;
}

export const FRAMES: FrameOption[] = [
  { id: "none", name: "No Frame", label: "✨" },
  { id: "strawberryPatisserie", name: "Strawberry Patisserie", label: "🍓" },
  { id: "lilyGarden", name: "Lily Garden", label: "🌸" },
  { id: "pinkRibbon", name: "Pink Ribbon", label: "🎀" },
  { id: "frenchBakery", name: "French Bakery", label: "🥐" },
  { id: "vintageCoquette", name: "Vintage Coquette", label: "💝" },
];

const BORDER_WIDTH = 20;

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  frame: FrameName
): void {
  if (frame === "none") return;

  switch (frame) {
    case "strawberryPatisserie":
      drawStrawberryFrame(ctx, width, height);
      break;
    case "lilyGarden":
      drawLilyFrame(ctx, width, height);
      break;
    case "pinkRibbon":
      drawRibbonFrame(ctx, width, height);
      break;
    case "frenchBakery":
      drawBakeryFrame(ctx, width, height);
      break;
    case "vintageCoquette":
      drawCoquetteFrame(ctx, width, height);
      break;
  }
}

function drawStrawberryFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const b = BORDER_WIDTH;

  // Cream border
  ctx.fillStyle = "#FFF8F0";
  ctx.fillRect(0, 0, w, b);
  ctx.fillRect(0, h - b, w, b);
  ctx.fillRect(0, 0, b, h);
  ctx.fillRect(w - b, 0, b, h);

  // Inner border line
  ctx.strokeStyle = "#F4C2C2";
  ctx.lineWidth = 2;
  ctx.strokeRect(b - 2, b - 2, w - 2 * b + 4, h - 2 * b + 4);

  // Outer border line
  ctx.strokeStyle = "#E8A0BF";
  ctx.lineWidth = 1;
  ctx.strokeRect(1, 1, w - 2, h - 2);

  // Draw small strawberries in corners
  const positions = [
    [6, 6],
    [w - 14, 6],
    [6, h - 14],
    [w - 14, h - 14],
  ];
  positions.forEach(([x, y]) => {
    ctx.font = "10px serif";
    ctx.fillText("🍓", x, y + 10);
  });
}

function drawLilyFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const b = BORDER_WIDTH;

  // Soft green border
  ctx.fillStyle = "#E8F5E9";
  ctx.fillRect(0, 0, w, b);
  ctx.fillRect(0, h - b, w, b);
  ctx.fillRect(0, 0, b, h);
  ctx.fillRect(w - b, 0, b, h);

  // Inner accent
  ctx.strokeStyle = "#C8E6C9";
  ctx.lineWidth = 2;
  ctx.strokeRect(b - 2, b - 2, w - 2 * b + 4, h - 2 * b + 4);

  // Floral corners
  const corners = [
    [4, 4],
    [w - 16, 4],
    [4, h - 16],
    [w - 16, h - 16],
  ];
  corners.forEach(([x, y]) => {
    ctx.font = "12px serif";
    ctx.fillText("🌸", x, y + 12);
  });
}

function drawRibbonFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const b = BORDER_WIDTH;

  // Pink ribbon border
  ctx.fillStyle = "#FDE8EA";
  ctx.fillRect(0, 0, w, b);
  ctx.fillRect(0, h - b, w, b);
  ctx.fillRect(0, 0, b, h);
  ctx.fillRect(w - b, 0, b, h);

  // Draw ribbon effect on top
  ctx.strokeStyle = "#E8A0BF";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x < w; x += 20) {
    ctx.moveTo(x, b / 2 - 3);
    ctx.quadraticCurveTo(x + 10, b / 2 + 3, x + 20, b / 2 - 3);
  }
  ctx.stroke();

  // Bottom ribbon
  ctx.beginPath();
  for (let x = 0; x < w; x += 20) {
    ctx.moveTo(x, h - b / 2 - 3);
    ctx.quadraticCurveTo(x + 10, h - b / 2 + 3, x + 20, h - b / 2 - 3);
  }
  ctx.stroke();

  // Bow in top center
  ctx.font = "14px serif";
  ctx.fillText("🎀", w / 2 - 7, b - 3);
}

function drawBakeryFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const b = BORDER_WIDTH;

  // Warm cream border
  ctx.fillStyle = "#FAF0E6";
  ctx.fillRect(0, 0, w, b);
  ctx.fillRect(0, h - b, w, b);
  ctx.fillRect(0, 0, b, h);
  ctx.fillRect(w - b, 0, b, h);

  // Dotted inner border
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = "#D4A574";
  ctx.lineWidth = 1;
  ctx.strokeRect(b - 1, b - 1, w - 2 * b + 2, h - 2 * b + 2);
  ctx.setLineDash([]);

  // Corner flourishes
  ctx.strokeStyle = "#D4A574";
  ctx.lineWidth = 1.5;

  // Top-left corner flourish
  ctx.beginPath();
  ctx.arc(b + 8, b + 8, 6, Math.PI, Math.PI * 1.5);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.arc(w - b - 8, b + 8, 6, Math.PI * 1.5, 0);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.arc(b + 8, h - b - 8, 6, Math.PI * 0.5, Math.PI);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.arc(w - b - 8, h - b - 8, 6, 0, Math.PI * 0.5);
  ctx.stroke();
}

function drawCoquetteFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
): void {
  const b = BORDER_WIDTH + 4;

  // Blush pink border
  ctx.fillStyle = "#F8D7DA";
  ctx.fillRect(0, 0, w, b);
  ctx.fillRect(0, h - b, w, b);
  ctx.fillRect(0, 0, b, h);
  ctx.fillRect(w - b, 0, b, h);

  // Pearl dots along edges
  ctx.fillStyle = "#F5F0EB";
  const pearlSpacing = 12;
  for (let x = b; x < w - b; x += pearlSpacing) {
    ctx.beginPath();
    ctx.arc(x, b / 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, h - b / 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let y = b; y < h - b; y += pearlSpacing) {
    ctx.beginPath();
    ctx.arc(b / 2, y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w - b / 2, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner lace line
  ctx.strokeStyle = "#E8A0BF";
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 2]);
  ctx.strokeRect(b + 2, b + 2, w - 2 * b - 4, h - 2 * b - 4);
  ctx.setLineDash([]);

  // Corner decorations
  const deco = [
    [4, 4],
    [w - 16, 4],
    [4, h - 16],
    [w - 16, h - 16],
  ];
  deco.forEach(([x, y]) => {
    ctx.font = "10px serif";
    ctx.fillText("✿", x + 1, y + 11);
  });
}

// Get CSS border style for live preview (simplified approximation)
export function getFrameCSS(frame: FrameName): React.CSSProperties {
  switch (frame) {
    case "none":
      return {};
    case "strawberryPatisserie":
      return {
        border: "4px solid #FFF8F0",
        outline: "2px solid #F4C2C2",
        outlineOffset: "-6px",
        borderRadius: "4px",
      };
    case "lilyGarden":
      return {
        border: "4px solid #E8F5E9",
        outline: "2px solid #C8E6C9",
        outlineOffset: "-6px",
        borderRadius: "4px",
      };
    case "pinkRibbon":
      return {
        border: "4px solid #FDE8EA",
        outline: "2px solid #E8A0BF",
        outlineOffset: "-6px",
        borderRadius: "8px",
      };
    case "frenchBakery":
      return {
        border: "4px solid #FAF0E6",
        outline: "1px dashed #D4A574",
        outlineOffset: "-6px",
        borderRadius: "2px",
      };
    case "vintageCoquette":
      return {
        border: "6px solid #F8D7DA",
        outline: "1px dotted #E8A0BF",
        outlineOffset: "-8px",
        borderRadius: "4px",
      };
    default:
      return {};
  }
}
