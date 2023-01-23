import { observer } from "mobx-react-lite";
import React from "react";
import VendingMachineStore from "../../model/VendingMachineStore";
import BanknoteIcon from "../BanknoteIcon/BanknoteIcon";

import "./Bank.scss";

type Props = { vendingMachine: VendingMachineStore };

const Bank = observer(({ vendingMachine }: Props) => {
  return (
    <div className="bank">
      <div className="bank-title">BANK</div>
      {Object.entries(vendingMachine.storedCash).map(([key, value]) => (
        <div>
          <div className="cash-handler__btn" key={key}>
            <BanknoteIcon />
            <span>{key}</span>
          </div>
          <span className="banknote-quantity"> {`QUANTITY ${value}`}</span>
        </div>
      ))}
    </div>
  );
});

export default Bank;
