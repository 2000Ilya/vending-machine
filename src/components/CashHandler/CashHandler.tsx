import { observer } from 'mobx-react-lite'
import React from 'react'
import { inputCashValues } from '../../model/types'
import VendingMachineStore from '../../model/VendingMachineStore'
import { useLocalStore } from '../../utils/useLocalStore'
import BanknoteIcon from '../BanknoteIcon/BanknoteIcon'

import "./CashHandler.scss"

type Props = {
  handleAddBalance: (cashValue: number) => void
}

const CashHandler = observer(({ handleAddBalance }: Props) => {
  const vendingMachine = useLocalStore(() => new VendingMachineStore());

  return (
    <div className='cash-handler'>

      {inputCashValues.map((cashValue: number, index: number) =>
        <button disabled={!vendingMachine.isProductSelected || vendingMachine.isProductSold} className='cash-handler__btn' key={index} onClick={() => { handleAddBalance(cashValue) }}>
          <BanknoteIcon />
          <span>{cashValue}</span>
        </button>
      )}
    </div>
  )
})

export default CashHandler