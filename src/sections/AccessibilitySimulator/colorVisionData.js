export const COLOR_VISION_MODES = [
  {
    id: "deuteranopia",
    label: "Deuteranopia",
    shortLabel: "Red–green",
    filterId: "color-filter-deuteranopia",
  },
  {
    id: "protanopia",
    label: "Protanopia",
    shortLabel: "Red weak",
    filterId: "color-filter-protanopia",
  },
  {
    id: "tritanopia",
    label: "Tritanopia",
    shortLabel: "Blue–yellow",
    filterId: "color-filter-tritanopia",
  },
];

export const COLOR_PALETTE = [
  { name: "Red", hex: "#dc2626" },
  { name: "Green", hex: "#16a34a" },
  { name: "Orange", hex: "#ea580c" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Purple", hex: "#9333ea" },
  { name: "Brown", hex: "#92400e" },
];

export const STATUS_DEMO = {
  bad: {
    tag: "Hard to read",
    title: "Color only",
    items: [
      { label: "Success", tone: "success" },
      { label: "Error", tone: "error" },
      { label: "Warning", tone: "warning" },
    ],
    colorOnly: true,
  },
  good: {
    tag: "Easy to read",
    title: "Color + words",
    items: [
      { label: "Success", tone: "success" },
      { label: "Error", tone: "error" },
      { label: "Warning", tone: "warning" },
    ],
    colorOnly: false,
  },
};

export const CONTRAST_EXAMPLES = [
  {
    id: "fail",
    label: "Low contrast",
    sample: "Can you read this?",
    foreground: "#a3a3a3",
    background: "#ffffff",
  },
  {
    id: "pass",
    label: "WCAG AA",
    sample: "Can you read this?",
    foreground: "#1a1a1a",
    background: "#ffffff",
  },
];

export function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function linearize(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

export function getRelativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
  );
}

export function getContrastRatio(foreground, background) {
  const fg = getRelativeLuminance(foreground);
  const bg = getRelativeLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastRating(ratio) {
  if (ratio >= 7) {
    return { level: "AAA", pass: true };
  }
  if (ratio >= 4.5) {
    return { level: "AA", pass: true };
  }
  return { level: "Fail", pass: false };
}
