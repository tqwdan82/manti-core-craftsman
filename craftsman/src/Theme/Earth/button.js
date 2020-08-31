import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import brown from "@material-ui/core/colors/brown";

export default (props) => {
  const handleClick = (e) => {
    props.onClick({
      theme: 5,
    });
  };

  return (
    <div>
      <IconButton aria-label="color-button" onClick={handleClick}>
        <Brightness1Icon fontSize="small" style={{ color: brown[500] }} />
      </IconButton>
    </div>
  );
};
