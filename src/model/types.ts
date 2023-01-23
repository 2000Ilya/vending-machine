export const inputCashValues = [50, 100, 500, 1000];

export type InputCashValuesType = typeof inputCashValues[number];

export const storedCashValues = [1, 5, 10, 50, 100, 500];

export type StoredCashValuesType = typeof storedCashValues[number];

export type ProductType = {
  name: string;
  price: number;
  quantity: number;
};

export type ProductSoldType = Omit<ProductType, "price">;

export type StoredCashType = {
  denomination: StoredCashValuesType;
  quantity: number;
};

export enum Status {
  TOP_UP_BALANCE = "Пополните баланс",
  CHANGE_GIVEN = "Возьмите сдачу",
  ERROR_CODE = "Неверный код товара!",
  EMPTY = "",
  PRODUCT_ABSENT = "Продукт отсутствует",
}

export type PrivateFields =
  | "_balance"
  | "_products"
  | "_productsSold"
  | "_storedCash"
  | "_changeGiven"
  | "_inputCode"
  | "_isProductSelected"
  | "_isProductSold";
