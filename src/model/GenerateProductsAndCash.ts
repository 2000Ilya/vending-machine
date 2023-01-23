import { ProductType, storedCashValues } from "./types";

const productNames: string[] = [
  "Twix",
  "Cola",
  "Milka",
  "Fanta",
  "Sandwich",
  "Mars",
  "Nuts",
  "Water",
];

export default class Generate {
  products: Record<string, ProductType>;
  storedCash: Record<string, number>;
  _randomNumbers: number[] = [];

  constructor() {
    this.products = this._generateProducts();
    this.storedCash = this._generateSortedStoredCash();
  }

  _generateRandomNumber(interval: number): number {
    return Math.floor(Math.random() * interval) + 1;
  }

  _generateProducts(): Record<string, ProductType> {
    const products: Record<string, ProductType> = {};
    const uniqueNumbers: number[] = this._generateUniqueNumbers(
      100,
      productNames.length
    );

    for (let i = 0; i < productNames.length; i++) {
      products[uniqueNumbers[i]] = {
        name: productNames[i],
        price: this._generateRandomNumber(1000),
        quantity: this._generateRandomNumber(10),
      };
    }

    return products;
  }

  _generateSortedStoredCash(): Record<string, number> {
    const storedCash: Record<string, number> = {};

    for (let i = 0; i < storedCashValues.length; i++) {
      storedCash[storedCashValues[i]] = this._generateRandomNumber(10);
    }

    return storedCash;
  }

  _generateUniqueNumbers(max: number, quantity: number): number[] {
    const set = new Set<number>();
    while (set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1);
    }
    return [...set.values()];
  }
}
