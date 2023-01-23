import React from "react";
import { observer } from "mobx-react-lite";
import Display from "../Display";
import NumPad from "../NumPad";
import VendingMachineStore from "../../model/VendingMachineStore";

import "./Terminal.scss";

type Props = {
  vendingMachine: VendingMachineStore;
};

const Terminal = observer((props: Props) => {
  return (
    <div className="terminal">
      <Display inputCode={props.vendingMachine.inputCode} />
      <NumPad vendingMachine={props.vendingMachine} />
    </div>
  );
});

export default Terminal;
