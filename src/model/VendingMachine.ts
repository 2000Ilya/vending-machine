import generateExample from "./generateExample";
import { ProductType, StoredCashValuesType } from "./types";

export default class VendingMachine {
  products: Record<string, ProductType>;
  storedCash: Record<string, any>;

  constructor() {
    this.products = generateExample.products;
    this.storedCash = generateExample.storedCash;

    console.log(generateExample.products, generateExample.storedCash);
  }

  _getCashFromBank(denomination: StoredCashValuesType, quantity: number) {
    this.storedCash[denomination] -= quantity;
    return denomination * quantity;
  }

  _getProduct(id: string, quantity: number): number {
    this.products[id].quantity -= quantity;
    return this.products[id].price * quantity;
  }

  giveChange(sum: number, productPrice: number): number {
    const changeNeeded = sum - productPrice;
    let changeSum = 0;
    const sortedStoredDenominations = Object.keys(this.storedCash).sort(
      (a, b) => Number(b) - Number(a)
    );
    const sortedPoducts = Object.keys(this.products).sort(
      (a: string, b: string) => this.products[b].price - this.products[a].price
    );

    for (let denomination of sortedStoredDenominations) {
      const denominationNum = Number(denomination);

      if (changeSum === changeNeeded) {
        break;
      } else if (denominationNum > changeNeeded) {
        continue;
      } else {
        if (
          this.storedCash[denomination] <
          Math.floor(changeNeeded / denominationNum)
        ) {
          changeSum += this._getCashFromBank(
            denominationNum,
            this.storedCash[denomination]
          );
        } else {
          changeSum += this._getCashFromBank(
            denominationNum,
            Math.floor(changeNeeded / denominationNum)
          );
        }
      }
    }

    if (changeNeeded > changeSum) {
      for (let productId of sortedPoducts) {
        const productPrice = this.products[productId].price;

        if (changeSum === changeNeeded) {
          break;
        } else if (productPrice > changeNeeded) {
          continue;
        } else {
          if (productPrice < Math.floor(changeNeeded / productPrice)) {
            changeSum += this._getProduct(
              productId,
              this.products[productId].quantity
            );
          } else {
            changeSum += this._getProduct(
              productId,
              Math.floor(changeNeeded / productPrice)
            );
          }
        }
      }
    }

    return changeSum;
  }

  buyProduct(id: string): void {
    this._getProduct(id, 1);
  }

  // _getChangeSum(
  //   changeSum: number,
  //   quantityNeeded: number,
  //   id: number,
  //   quantityInStock: number,
  //   changeSumCB: () => number
  // ) {
  //   if (quantityInStock < quantityNeeded) {
  //     changeSum += changeSumCB(id, quantityInStock);
  //   } else {
  //     changeSum += changeSumCB(id, quantityNeeded);
  //   }
  //   return changeSum;
  // }
}
