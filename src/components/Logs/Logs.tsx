import React from "react";
import { observer } from "mobx-react-lite";
import VendingMachineStore from "../../model/VendingMachineStore";

import "./Logs.scss"

type Props = {
  vendingMachine: VendingMachineStore;
};

const Logs = observer(({ vendingMachine }: Props) => {
  return (
    <div className="logs">
      {vendingMachine.logs.map((log) => (
        <div className="log">{log}</div>
      ))}
    </div>
  );
});

export default Logs;
