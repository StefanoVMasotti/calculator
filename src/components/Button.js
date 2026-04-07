import React from "react";
import "../styles/Button.css";

function Button(props) {
  const isOperator = (value) => {
    return isNaN(value) && value !== "." && value !== "=";
  };

  return (
    <button
      className={`button-container ${isOperator(props.value) ? "operator" : ""}`.trimEnd()}
      onClick={() => props.handleInput(props.value)}
    >
      {props.value}
    </button>
  );
}

export default Button;
