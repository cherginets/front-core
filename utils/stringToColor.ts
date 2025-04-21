export function stringToColor(str: string, format: "hsl" | "rgb" | "hex" = "hsl"): string {
  const hash = fnv1aHash(str) ;

  // Генерация HSL-значений
  const hue = (hash % 360 + 360) % 360; // Оттенок (0-360)
  const saturation = 65 + (hash % 25); // Насыщенность (65-90%)
  const lightness = 50 + (hash % 10); // Яркость (50-60%)

  if (format === "hsl") {
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else if (format === "rgb") {
    return hslToRgbString(hue, saturation, lightness);
  } else if (format === "hex") {
    return hslToHex(hue, saturation, lightness);
  } else {
    throw new Error("Unsupported format. Use 'hsl', 'rgb', or 'hex'.");
  }
}

// 🚀 Улучшенная хеш-функция FNV-1a
function fnv1aHash(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0; // Возвращаем беззнаковое число
}

// 🎨 HSL → RGB
function hslToRgbString(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  return `rgb(${r}, ${g}, ${b})`;
}

// 🎨 HSL → HEX
function hslToHex(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgb(h, s, l);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// 📌 Конвертация HSL → RGB
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}