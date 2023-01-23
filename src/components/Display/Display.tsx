import React from 'react'
import VendingMachineStore from '../../model/VendingMachineStore'
import { useLocalStore } from '../../utils/useLocalStore';
import { observer } from 'mobx-react-lite';

import "./Display.scss"

type Props = {
  inputCode: string
}

const Display = ({ inputCode }: Props) => {

  return (
    <div className='display'>
      {inputCode}
    </div>
  )
}

export default Display