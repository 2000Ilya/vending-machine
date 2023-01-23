import React from "react";
import { observer } from "mobx-react-lite";

import VendingMachineStore from "../../model/VendingMachineStore";
import BackspaceIcon from "../BackspaceIcon/BackspaceIcon";
import Button from "./Button";

import "./NumPad.scss";
import { Status } from "../../model/types";

type Props = {
  vendingMachine: VendingMachineStore;
};

const NumPad = observer(({ vendingMachine }: Props) => {
  const handleButtonClick = (codeSymbol: string): void => {
    vendingMachine.changeInputCode(codeSymbol);
  };

  const handleProductSelect = () => {
    if (vendingMachine.inputCode.length > 0) {
      if (
        Object.keys(vendingMachine.products).includes(vendingMachine.inputCode)
      ) {
        vendingMachine.addLog(
          `Selected product ${vendingMachine.products[vendingMachine.inputCode].name
          } with price ${vendingMachine.products[vendingMachine.inputCode].price
          } and availability of ${vendingMachine.products[vendingMachine.inputCode].quantity
          } products`
        );
        if (vendingMachine.products[vendingMachine.inputCode].quantity !== 0) {
          vendingMachine.addLog(Status.TOP_UP_BALANCE);
          vendingMachine.setIsProductSelected(true);
        } else {
          vendingMachine.addLog(Status.PRODUCT_ABSENT);
        }
      } else {
        vendingMachine.addLog(Status.ERROR_CODE);
        vendingMachine.changeInputCode("");
      }
    }
  };

  return (
    <>
      <div className="num-pad">
        <div className="num-pad__square-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num: number) => (
            <Button
              disabled={
                vendingMachine.isProductSelected || vendingMachine.isProductSold
              }
              key={num}
              handleClick={() => {
                handleButtonClick(String(num));
              }}
              text={`${num}`}
            />
          ))}
        </div>
        <div className="num-pad__bottom-group">
          <Button
            disabled={
              vendingMachine.isProductSelected || vendingMachine.isProductSold
            }
            wide
            handleClick={() => {
              handleButtonClick("0");
            }}
            text={"0"}
          />
          <button
            disabled={
              vendingMachine.isProductSelected || vendingMachine.isProductSold
            }
            onClick={() => {
              handleButtonClick("");
            }}
          >
            <BackspaceIcon />
          </button>
        </div>
        <Button
          disabled={
            vendingMachine.isProductSelected || vendingMachine.isProductSold
          }
          wide
          handleClick={handleProductSelect}
          text={"SELECT"}
        />
        <Button
          disabled={!vendingMachine.isProductSold}
          wide
          handleClick={vendingMachine.handleGetChange}
          text={"GET CHANGE"}
        />
      </div>
    </>
  );
});

export default NumPad;
