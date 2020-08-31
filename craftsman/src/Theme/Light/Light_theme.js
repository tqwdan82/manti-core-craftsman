import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        padding: "10px",
      },
      fullWidth: {
        maxWidth: "100%",
      },
    },
  },
  props: {
    MuiTextField: {
      // variant: "outlined",
      // InputLabelProps: {
      //   shrink: true,
      // },
    },
  },
});
