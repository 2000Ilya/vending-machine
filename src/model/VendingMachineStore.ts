import { action, computed, makeObservable, observable } from "mobx";
import generateExample from "./generateExample";
import {
  PrivateFields,
  ProductSoldType,
  ProductType,
  StoredCashValuesType,
} from "./types";

export default class VendingMachineStore {
  private _balance: number = 0;
  private _products: Record<string, ProductType>;
  private _productsSold: Record<string, ProductSoldType> = {};
  private _storedCash: Record<string, any>;
  private _changeGiven: Record<string, number> = {};
  private _inputCode: string = "";
  private _isProductSelected: boolean = false;
  private _isProductSold: boolean = false;

  constructor() {
    makeObservable<VendingMachineStore, PrivateFields>(this, {
      _isProductSelected: observable,
      _isProductSold: observable,
      _balance: observable,
      _products: observable,
      _productsSold: observable,
      _storedCash: observable,
      _changeGiven: observable,
      _inputCode: observable,
      balance: computed,
      products: computed,
      productsSold: computed,
      storedCash: computed,
      changeGiven: computed,
      inputCode: computed,
      isProductSelected: computed,
      isProductSold: computed,
      giveChange: action,
      addBalance: action,
      changeInputCode: action,
      setIsProductSelected: action,
      setIsProductSold: action,
    });
    this._products = generateExample.products;
    this._storedCash = generateExample.storedCash;

    for (let denomination in this._storedCash) {
      this._changeGiven[denomination] = 0;
    }

    for (let key in this._products) {
      this._productsSold[key] = {
        name: this._products[key].name,
        quantity: 0,
      };
    }
    this._getCashFromBank = this._getCashFromBank.bind(this);
    this._getProduct = this._getProduct.bind(this);
    this._getCashChange = this._getCashChange.bind(this);
    this._getProductChange = this._getProductChange.bind(this);
    this._buyProduct = this._buyProduct.bind(this);
    this.giveChange = this.giveChange.bind(this);
    this.addBalance = this.addBalance.bind(this);
    this.changeInputCode = this.changeInputCode.bind(this);
    this.setIsProductSelected = this.setIsProductSelected.bind(this);
    this.setIsProductSold = this.setIsProductSold.bind(this);
    this.destroy = this.destroy.bind(this);

    console.log(generateExample.products, generateExample.storedCash, this);
  }

  get isProductSelected(): boolean {
    return this._isProductSelected;
  }

  get isProductSold(): boolean {
    return this._isProductSold;
  }

  get inputCode(): string {
    console.log(this._inputCode);

    return this._inputCode;
  }

  get balance(): number {
    return this._balance;
  }

  get products(): Record<string, ProductType> {
    return this._products;
  }

  get productsSold(): Record<string, ProductSoldType> {
    return this._productsSold;
  }

  get storedCash(): Record<string, any> {
    return this._storedCash;
  }

  get changeGiven(): Record<string, number> {
    return this._changeGiven;
  }

  _getCashFromBank(denomination: StoredCashValuesType, quantity: number) {
    this._storedCash[denomination] -= quantity;
    this._changeGiven[denomination] += quantity;
    return denomination * quantity;
  }

  _getProduct(id: string, quantity: number): number {
    this._products[id].quantity -= quantity;
    this._productsSold[id].quantity += quantity;
    return this._products[id].price * quantity;
  }

  _getCashChange(changeNeeded: number): number {
    let changeSum = 0;

    const sortedStoredDenominations = Object.keys(this._storedCash).sort(
      (a, b) => Number(b) - Number(a)
    );

    for (let denomination of sortedStoredDenominations) {
      const denominationNum = Number(denomination);

      if (changeSum === changeNeeded - changeSum) {
        break;
      } else if (denominationNum > changeNeeded - changeSum) {
        continue;
      } else {
        if (
          this._storedCash[denomination] <=
          Math.floor((changeNeeded - changeSum) / denominationNum)
        ) {
          changeSum += this._getCashFromBank(
            denominationNum,
            this._storedCash[denomination]
          );
        } else {
          changeSum += this._getCashFromBank(
            denominationNum,
            Math.floor((changeNeeded - changeSum) / denominationNum)
          );
        }
      }
    }

    return changeSum;
  }

  _getProductChange(changeNeeded: number): number {
    let changeSum = 0;

    const sortedProducts = Object.keys(this._products).sort(
      (a: string, b: string) =>
        Number(this._products[b].price) - Number(this._products[a].price)
    );

    for (let productId of sortedProducts) {
      const productPrice = this._products[productId].price;

      if (changeSum === changeNeeded) {
        break;
      } else if (productPrice > changeNeeded) {
        continue;
      } else {
        const productsQuantityNeeded = Math.floor(changeNeeded / productPrice);
        if (productsQuantityNeeded <= this._products[productId].quantity) {
          changeSum += this._getProduct(productId, productsQuantityNeeded);
        } else {
          changeSum += this._getProduct(
            productId,
            this._products[productId].quantity
          );
        }
      }

      changeNeeded -= changeSum;
    }

    return changeSum;
  }

  _buyProduct(id: string): number {
    return this._getProduct(id, 1);
  }

  giveChange() {
    let changeAccumulated = 0;

    if (this._balance > 0) {
      changeAccumulated = this._getCashChange(this._balance);
      this._balance -= changeAccumulated;
    }
    if (this._balance > 0) {
      changeAccumulated = this._getProductChange(this._balance);
      this._balance -= changeAccumulated;
    }
  }

  addBalance(sum: number, productCode: string, callback: () => void) {
    this._balance += sum;
    if (this._balance >= this.products[productCode].price) {
      this._balance -= this._buyProduct(productCode);
      callback();
    }
  }

  changeInputCode(codeSymbol: string): void {
    console.log(this._inputCode, codeSymbol);
    if (codeSymbol.length === 0) {
      this._inputCode = "";
    } else if (this._inputCode.length < 2) {
      this._inputCode = `${this._inputCode}${codeSymbol}`;
    }
  }

  setIsProductSelected(isProductSelected: boolean): void {
    this._isProductSelected = isProductSelected;
  }

  setIsProductSold(isProductSold: boolean): void {
    this._isProductSold = isProductSold;
  }

  destroy(): void {
    this._products = generateExample.products;
    this._storedCash = generateExample.storedCash;
  }
}
