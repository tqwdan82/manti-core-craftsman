import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import lime from "@material-ui/core/colors/lime";

export default (props) => {
  const handleClick = (e) => {
    props.onClick({
      theme: 2,
    });
  };

  return (
    <div>
      <IconButton aria-label="color-button" onClick={handleClick}>
        <Brightness1Icon fontSize="small" style={{ color: lime[500] }} />
      </IconButton>
    </div>
  );
};
