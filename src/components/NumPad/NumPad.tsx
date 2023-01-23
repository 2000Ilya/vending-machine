import React from "react";
import { observer } from "mobx-react-lite";

import VendingMachineStore from "../../model/VendingMachineStore";
import { useLocalStore } from "../../utils/useLocalStore";
import BackspaceIcon from "../BackspaceIcon/BackspaceIcon";
import Button from "./Button";

import "./NumPad.scss";

type Props = {
  handleGetChange: () => void;
  handleProductSelect: () => void;
  changeInputCode: (codeSymbol: string) => void;
};

const NumPad = observer(
  ({ handleProductSelect, handleGetChange, changeInputCode }: Props) => {
    const vendingMachine = useLocalStore(() => new VendingMachineStore());

    const handleButtonClick = (codeSymbol: string): void => {
      changeInputCode(codeSymbol);
    };

    return (
      <>
        <div className="num-pad">
          <div className="num-pad__square-container">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num: number) => (
              <Button
                disabled={
                  vendingMachine.isProductSelected ||
                  vendingMachine.isProductSold
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
                vendingMachine.isProductSelected ||
                vendingMachine.isProductSold
              }
              wide
              handleClick={() => {
                handleButtonClick("0");
              }}
              text={"0"}
            />
            <button
              disabled={
                vendingMachine.isProductSelected ||
                vendingMachine.isProductSold
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
            handleClick={handleGetChange}
            text={"GET CHANGE"}
          />
        </div>
      </>
    );
  }
);

export default NumPad;
