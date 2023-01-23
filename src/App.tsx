import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import CashHandler from "./components/CashHandler";
import Terminal from "./components/Terminal";
import { inputCashValues, Status } from "./model/types";
import VendingMachineStore from "./model/VendingMachineStore";
import { useLocalStore } from "./utils/useLocalStore";

import "./App.scss";

const App: React.FC = observer(() => {
  const vendingMachine = useLocalStore(() => new VendingMachineStore());
  const [code, setCode] = useState<string>("");
  const [isProductSelected, setIsProductSelected] = useState<boolean>(false);
  const [isProductSold, setIsProductSold] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<Status>(Status.EMPTY);

  const handleGetChange = () => {
    vendingMachine.giveChange();
    setIsProductSold(false);
    vendingMachine.setIsProductSold(false);
  };

  const handleProductSelect = () => {
    // console.log(vendingMachine.inputCode, vendingMachine.inputCode.length, vendingMachine.inputCode.length > 0);
    console.log(vendingMachine.inputCode);

    if (vendingMachine.inputCode.length > 0) {
      console.log();

      if (
        Object.keys(vendingMachine.products).includes(vendingMachine.inputCode)
      ) {
        if (vendingMachine.products[vendingMachine.inputCode].quantity !== 0) {
          console.log(Status.TOP_UP_BALANCE);
          setIsProductSelected(true);
          vendingMachine.setIsProductSelected(true);
          setStatusText(Status.TOP_UP_BALANCE);
        } else {
          console.log(Status.PRODUCT_ABSENT);
          setStatusText(Status.PRODUCT_ABSENT);
        }
      } else {
        console.log(Status.ERROR_CODE);
        setCode("");
        vendingMachine.changeInputCode("");
        setStatusText(Status.ERROR_CODE);
      }
    }
  };

  const handleAddBalance = (sum: number) => {
    vendingMachine.addBalance(sum, vendingMachine.inputCode, () => {
      setIsProductSold(true);
      setCode("");
      vendingMachine.changeInputCode("");
      setIsProductSelected(false);
      vendingMachine.setIsProductSold(true);
      vendingMachine.setIsProductSelected(false);
    });
  };

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);

    if (statusText.length > 0) {
      setStatusText(Status.EMPTY);
    }
  };

  const terminalProps = { handleProductSelect, handleGetChange };

  return (
    <div className="App">
      <div>{`Баланс: ${vendingMachine.balance}`}</div>
      {inputCashValues.map((cashValue: number, index: number) => (
        <button
          key={index}
          disabled={!isProductSelected || isProductSold}
          onClick={() => {
            handleAddBalance(cashValue);
          }}
        >
          {cashValue}
        </button>
      ))}
      <input
        disabled={isProductSelected || isProductSold}
        type="text"
        value={code}
        onChange={handleInputField}
      />
      <button disabled={!isProductSold} onClick={handleGetChange}>
        {"Сдача"}
      </button>
      <button
        disabled={isProductSelected || isProductSold}
        onClick={handleProductSelect}
      >
        {"Выбрать"}
      </button>
      <div>{statusText}</div>
      <div>{"Продукты"}</div>
      {Object.entries(vendingMachine.products).map(([key, value]) => (
        <div
          key={key}
        >{`Code: ${key}; ${value.name}; ${value.price}; ${value.quantity}`}</div>
      ))}
      <div>{"Проданные продукты"}</div>
      {Object.entries(vendingMachine.productsSold).map(([key, value]) => (
        <div
          key={key}
        >{`Code: ${key}; ${value.name}; qua: ${value.quantity}`}</div>
      ))}
      <div>{"Банк"}</div>
      {Object.entries(vendingMachine.storedCash).map(([key, value]) => (
        <div key={key}>{`Denom: ${key}; ${value}`}</div>
      ))}
      <div>{"Cдача"}</div>
      {Object.entries(vendingMachine.changeGiven).map(([key, value]) => (
        <div key={key}>{`Denom: ${key}; ${value}`}</div>
      ))}
      <div className="vending-machine">
        <div></div>
        <Terminal {...terminalProps} />
        <CashHandler handleAddBalance={handleAddBalance} />
      </div>
    </div>
  );
});

export default App;
