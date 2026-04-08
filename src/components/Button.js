import React from "react";
import "../styles/Button.css";

function Button(props) {
  const isOperator = (value) => {
    return isNaN(value) && value !== "." && value !== "=";
  };

  const isActive =
    props.activeKey === props.value ||
    (props.value === "=" && props.activeKey === "Enter") ||
    (props.value === "Clear" && props.activeKey === "Escape");

  return (
    <button
      className={`button-container ${isOperator(props.value) ? "operator" : ""} ${isActive ? "active" : ""}`.trimEnd()}
      onClick={() => props.handleInput(props.value)}
    >
      {props.value}
    </button>
  );
}

export default Button;
