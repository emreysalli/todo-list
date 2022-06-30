import React from "react";

function Task(props){

  let textDecoration;
  let opacity;
  if(props.complete){
    textDecoration="line-through";
    opacity=0.5;
  }else{
    textDecoration="none";
    opacity=1;
  }

  return (
    <div
      className="item"
      style={{ display: "inline-block", marginRight: "5px",opacity:opacity }}
    >
      <span
        className="itemText" id={props.id}
        style={{ fontSize: "24px", color: "#000", marginLeft: "5px", textDecoration:textDecoration }}
      >
        {props.id+1}- {props.text}
      </span>
    </div>
  );
};

export default React.memo(Task);