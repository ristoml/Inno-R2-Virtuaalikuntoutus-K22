import React from "react";

const Button = (props) => {
  return (
    <button
      style={{position: "absolute", zIndex: 2}}
      value={props.value}
      // onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Button;