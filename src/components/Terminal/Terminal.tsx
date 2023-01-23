import React from 'react'
import { observer } from 'mobx-react-lite'
import Display from '../Display'
import NumPad from '../NumPad'
import { useLocalStore } from '../../utils/useLocalStore'
import VendingMachineStore from '../../model/VendingMachineStore'

import "./Terminal.scss"

type Props = {
  handleGetChange: () => void,
  handleProductSelect: () => void
}

const Terminal = observer((props: Props) => {
  const vendingMachine = useLocalStore(() => new VendingMachineStore());

  return (
    <div className='terminal'>
      <Display inputCode={vendingMachine.inputCode} />
      <NumPad {...props} changeInputCode={vendingMachine.changeInputCode} />
    </div>
  )
})

export default Terminal