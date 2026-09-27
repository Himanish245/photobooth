export interface PatisserieItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string; // gradient accent color
}

export const patisserieItems: PatisserieItem[] = [
  {
    id: "shortcake",
    name: "Strawberry Shortcake",
    subtitle: "Layers of Love",
    description:
      "Delicate vanilla sponge layered with fresh strawberries and clouds of whipped cream, dusted with powdered sugar.",
    emoji: "🍰",
    color: "#F8D7DA",
  },
  {
    id: "macaron",
    name: "Strawberry Macaron",
    subtitle: "Sweet Petals",
    description:
      "Rose-tinted almond shells with a luscious strawberry ganache filling, each one a tiny treasure.",
    emoji: "🧁",
    color: "#F4C2C2",
  },
  {
    id: "tart",
    name: "Strawberry Tart",
    subtitle: "Garden Kiss",
    description:
      "Buttery pâte sucrée filled with vanilla pastry cream and crowned with glazed strawberries.",
    emoji: "🍓",
    color: "#E8A0BF",
  },
  {
    id: "mille-feuille",
    name: "Vanilla Mille-Feuille",
    subtitle: "A Thousand Whispers",
    description:
      "Crisp puff pastry layers embracing vanilla bean crème pâtissière, finished with a delicate fondant glaze.",
    emoji: "🥐",
    color: "#FFF8F0",
  },
  {
    id: "croissant",
    name: "Pink Croissant",
    subtitle: "Morning Blush",
    description:
      "Flaky, golden croissant kissed with raspberry glaze and a dusting of rose petals.",
    emoji: "🥐",
    color: "#FDE8EA",
  },
];
