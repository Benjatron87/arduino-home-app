import React from "react";
import "./Wrapper.css";

function Wrapper(props) {
  return (
  <div className="container wrapper">
    {props.children}
  </div>
  )
}

export default Wrapper;