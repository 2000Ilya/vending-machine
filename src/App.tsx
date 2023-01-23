import React from "react";
import { observer } from "mobx-react-lite";

import CashHandler from "./components/CashHandler";
import Terminal from "./components/Terminal";
import Logs from "./components/Logs";
import VendingMachineStore from "./model/VendingMachineStore";
import { useLocalStore } from "./utils/useLocalStore";
import Products from "./components/Products";
import Bank from "./components/Bank";

import "./App.scss";

const App: React.FC = observer(() => {
  const vendingMachine = useLocalStore(() => new VendingMachineStore());

  return (
    <div className="App">
      <div className="vending-machine">
        <Logs vendingMachine={vendingMachine} />
        <Products vendingMachine={vendingMachine} />
        <Terminal vendingMachine={vendingMachine} />
        <CashHandler vendingMachine={vendingMachine} />
      </div>
      <Bank vendingMachine={vendingMachine} />
    </div>
  );
});

export default App;
