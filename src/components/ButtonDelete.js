import React from "react";
import "../styles/ButtonDelete.css";

const ButtonDelete = (props) => {
  return (
    <div className="button-delete" onClick={props.handleDelete}>
      {props.value}
    </div>
  );
};

export default ButtonDelete;
