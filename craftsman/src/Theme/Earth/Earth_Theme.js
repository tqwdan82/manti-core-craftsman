import { createMuiTheme } from "@material-ui/core/styles";

import brown from "@material-ui/core/colors/brown";
import green from "@material-ui/core/colors/green";
import teal from "@material-ui/core/colors/teal";

export default createMuiTheme({
  palette: {
    primary: brown,
    secondary: green,
    error: teal,
    action: {
      disabledBackground: teal[600],
    },
    text: {
      primary: brown[900],
      secondary: brown[600],
      disabled: green[600],
    },
  },
});
