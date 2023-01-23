import React from "react";
import { observer } from "mobx-react-lite";
import VendingMachineStore from "../../model/VendingMachineStore";

import "./Products.scss";

type Props = {
  vendingMachine: VendingMachineStore;
};

const Products = observer(({ vendingMachine }: Props) => {
  return (
    <div className="vending-machine-prototype">
      <div className="vending-machine-prototype__balance">{`BALANCE ${vendingMachine.balance}`}</div>
      <div className="vending-machine-prototype__screen">
        <div className="products">
          {Object.entries(vendingMachine.products).map(([key, value]) => (
            <div className="product" key={key}>
              <div className="product__cover">{value.name}</div>
              <div className="product__info">
                <span className="product__code">{`CODE ${key}`}</span>
                <span className="product__price">{`COST ${value.price}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="vending-machine-prototype__tray"></div>
    </div>
  );
});

export default Products;
