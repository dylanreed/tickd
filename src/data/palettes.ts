// ABOUTME: Color palette definitions for the app theme system.
// ABOUTME: Contains warm, neutral, and contrast palettes for future settings customization.

export type PaletteId = "warm" | "neutral" | "contrast";

export interface Palette {
  id: PaletteId;
  name: string;
  colors: {
    // Backgrounds
    bg: string;
    bgSecondary: string;
    card: string;
    // Accent
    accent: string;
    accentHover: string;
    accentSoft: string;
    // Supporting accents
    mint: string;
    golden: string;
    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
  };
}

export const palettes: Record<PaletteId, Palette> = {
  warm: {
    id: "warm",
    name: "Warm",
    colors: {
      bg: "#FFF5EB",
      bgSecondary: "#FFE8D6",
      card: "#FFFAF5",
      accent: "#E85D4C",
      accentHover: "#D14B3A",
      accentSoft: "#FFCDB2",
      mint: "#B8E0D2",
      golden: "#FFD166",
      textPrimary: "#4A3728",
      textSecondary: "#8B7355",
      textMuted: "#A89580",
    },
  },
  neutral: {
    id: "neutral",
    name: "Neutral",
    colors: {
      bg: "#F7F5F3",
      bgSecondary: "#EDE9E4",
      card: "#FFFFFF",
      accent: "#E85D4C",
      accentHover: "#D14B3A",
      accentSoft: "#F5D5D0",
      mint: "#B8E0D2",
      golden: "#FFD166",
      textPrimary: "#3D3D3D",
      textSecondary: "#6B6B6B",
      textMuted: "#9E9E9E",
    },
  },
  contrast: {
    id: "contrast",
    name: "Contrast",
    colors: {
      bg: "#E8E4F0",
      bgSecondary: "#D9D2E9",
      card: "#F8F6FB",
      accent: "#E85D4C",
      accentHover: "#D14B3A",
      accentSoft: "#E8C4C0",
      mint: "#B8E0D2",
      golden: "#FFD166",
      textPrimary: "#3D3D3D",
      textSecondary: "#6B5B7A",
      textMuted: "#9E8FA8",
    },
  },
};

export const defaultPalette: PaletteId = "neutral";
