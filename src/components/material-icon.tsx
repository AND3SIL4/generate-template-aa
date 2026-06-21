import React, { JSX } from "react"
import { cn } from "@/lib/utils"

interface MaterialIconProps {
  icon: JSX.Element
  filled?: boolean
  className?: string
  style?: React.CSSProperties

}

const MaterialIcon = ({ icon, filled, className, style }: MaterialIconProps) => {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-rounded select-none", filled && "filled", className)}
      style={style}
    >
      {icon}
    </span>
  )

}

export default MaterialIcon;