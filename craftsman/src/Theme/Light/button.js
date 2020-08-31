import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness1Icon from "@material-ui/icons/Brightness1";

export default (props) => {
  const handleClick = (e) => {
    props.onClick({
      theme: 0,
    });
  };

  return (
    <div>
      <IconButton aria-label="color-button" onClick={handleClick}>
        <Brightness1Icon fontSize="small" style={{ color: "#f5f5f5" }} />
      </IconButton>
    </div>
  );
};
