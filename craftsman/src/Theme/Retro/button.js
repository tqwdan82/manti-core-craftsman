import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import purple from "@material-ui/core/colors/purple";

export default (props) => {
  const handleClick = (e) => {
    props.onClick({
      theme: 3,
    });
  };

  return (
    <div>
      <IconButton aria-label="color-button" onClick={handleClick}>
        <Brightness1Icon fontSize="small" style={{ color: purple[500] }} />
      </IconButton>
    </div>
  );
};
