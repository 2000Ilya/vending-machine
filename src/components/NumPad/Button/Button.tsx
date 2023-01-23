import React from 'react'

import "./Button.scss"

type Props = {
  wide?: boolean
  text: string
  handleClick: (text: string) => void
} &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ wide, text, handleClick, ...restProps }: Props) => {
  return (
    <button
      className={'btn' + (wide ? ' btn__wide' : "")}
      onClick={() => { handleClick(text) }}
      {...restProps}
    >
      {text}
    </button>
  )
}

export default Button