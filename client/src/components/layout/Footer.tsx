import React, { FC } from 'react'

const Footer: FC = () => {
  const getCurrentYear = (): number => {
    return new Date().getFullYear()
  }
  return (
    <div className="py-3">
       Copyright &copy; {getCurrentYear()} Movies World DVDs Shop
      <a
        href="https://lijunzhao.com"
        target="_blank"
        rel="noreferrer"
        className="ms-3"
      >
        Lijun Zhao
      </a>
    </div>
  )
}

export default Footer
