import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import yellow from "@material-ui/core/colors/yellow";

export default (props) => {
  const handleClick = (e) => {
    props.onClick({
      theme: 4,
    });
  };

  return (
    <div>
      <IconButton aria-label="color-button" onClick={handleClick}>
        <Brightness1Icon fontSize="small" style={{ color: yellow[500] }} />
      </IconButton>
    </div>
  );
};
