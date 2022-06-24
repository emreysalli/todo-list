import React from "react";

export function Task(props) {

  let textDecoration;
  
  if(props.complete){
    textDecoration="line-through";
  }else{
    textDecoration="none";
  }

  return (
    <div
      className="item"
      style={{ display: "inline-block", marginRight: "5px" }}
    >
      <span
        className="itemText" id={props.id}
        style={{ fontSize: "24px", color: "#000", marginLeft: "5px", textDecoration:textDecoration }}
      >
        {props.id+1}- {props.text}
      </span>
    </div>
  );
}
