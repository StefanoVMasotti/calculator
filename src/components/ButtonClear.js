import React from "react";
import "../styles/ButtonClear.css";

const ButtonClear = (props) => {
  return (
    <div className="button-clear" onClick={props.handleClear}>
      {props.value}
    </div>
  );
};

export default ButtonClear;
