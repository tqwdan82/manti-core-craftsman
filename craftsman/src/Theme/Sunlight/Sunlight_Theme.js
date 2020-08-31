import { createMuiTheme } from "@material-ui/core/styles";

import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import lime from "@material-ui/core/colors/lime";

export default createMuiTheme({
  palette: {
    primary: yellow,
    secondary: orange,
    error: lime,
    action: {
      disabledBackground: lime[400],
    },
    text: {
      primary: yellow[900],
      secondary: yellow[600],
      disabled: amber[100],
    },
  },
});
