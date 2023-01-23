import { observer } from "mobx-react-lite";
import React from "react";
import { inputCashValues } from "../../model/types";
import VendingMachineStore from "../../model/VendingMachineStore";
import BanknoteIcon from "../BanknoteIcon/BanknoteIcon";

import "./CashHandler.scss";

type Props = {
  vendingMachine: VendingMachineStore;
};

const CashHandler = observer(({ vendingMachine }: Props) => {
  const handleAddBalance = (sum: number) => {
    vendingMachine.addBalance(sum, vendingMachine.inputCode, () => {
      vendingMachine.changeInputCode("");
      vendingMachine.setIsProductSold(true);
      vendingMachine.setIsProductSelected(false);
    });
  };

  return (
    <div className="cash-handler">
      {inputCashValues.map((cashValue: number, index: number) => (
        <button
          disabled={
            !vendingMachine.isProductSelected || vendingMachine.isProductSold
          }
          className="cash-handler__btn"
          key={index}
          onClick={() => {
            handleAddBalance(cashValue);
          }}
        >
          <BanknoteIcon />
          <span>{cashValue}</span>
        </button>
      ))}
    </div>
  );
});

export default CashHandler;
