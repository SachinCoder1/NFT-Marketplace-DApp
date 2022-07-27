import React from 'react';
import { BallTriangle } from  'react-loader-spinner'
 
const Loading = () => (
    <BallTriangle
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
);
 
export default Loading;