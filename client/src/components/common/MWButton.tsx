import React, { FC } from 'react'

// Import npm packages
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 1rem;
  border: none;
  background-color: var(--brand);
  transition: all 0.2s;

  &:hover, &:active, &:focus {
    background-color: var(--brand-dark);
    transform: scale(1.02);
    box-shadow: none;
  }
`

export enum ButtonType {
  Button,
  Submit
}

interface ButtonProps {
  children?: string
  variant?: string
  type?: string
  loadingState?: boolean
  onClick?: Function
  disabled?: boolean
  className?: string
}

const MWButton: FC<ButtonProps> = ({ children, variant, type, loadingState, onClick, disabled, className }) => {
  return (
    <StyledButton
      variant={variant}
      type={type}
      onClick={onClick}
      className={loadingState && 'button-gradient-loading'}
      disabled={loadingState}
    >
      {children}
    </StyledButton>
  )
}

export default MWButton
