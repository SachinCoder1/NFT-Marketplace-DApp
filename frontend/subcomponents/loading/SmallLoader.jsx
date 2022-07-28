import React from 'react'
import { Oval } from "react-loader-spinner";

export default function SmallLoader() {
  return (
    <Oval
          height="100"
          width="100"
          radius="9"
          color="#48bb78"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
  )
}
