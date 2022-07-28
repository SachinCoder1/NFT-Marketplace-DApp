import React from "react";
import { Oval } from "react-loader-spinner";

export default function SmallLoader() {
  return (
    <Oval
      height="20"
      width="20"
      radius="9"
      color="#fff"
      ariaLabel="three-dots-loading"
      wrapperStyle
      wrapperClass
    />
  );
}
