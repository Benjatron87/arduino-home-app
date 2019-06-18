import React from "react";
import "./Wrapper.css";

function Wrapper(props) {
  return (
  <div className="container wrapper  d-flex justify-content-center">
    {props.children}
  </div>
  )
}

export default Wrapper;