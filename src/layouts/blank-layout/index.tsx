import React, { FC, CSSProperties } from 'react'
import { LayoutBaseProps } from '../types'

interface BlankLayoutProps extends LayoutBaseProps {
  className?: string
  style?: CSSProperties
}

const BlankLayout: FC<BlankLayoutProps> = ({ className, style, children }) => (
  <div className={className} style={style}>
    {children}
  </div>
)

export default BlankLayout
