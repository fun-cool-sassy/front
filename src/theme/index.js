import { createMuiTheme } from "@material-ui/core/styles";
const color = {
  palette: {
    primary: {
      main: '#999999',
      contrastText: 'white'
    },
    secondary: {
      main: '#444444',
      contrastText: "black"
    },
    background:{
      default:'#444444',
    },
    text:{
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
      primary: "#999999",
      secondary: "#444444",
    }
  }
}
const typography = {
  useNextVariants: true,
  fontFamily: [
    "Noto Sans KR"
  ].join(","),
}
const overrides = {
    MuiInputLabel: {
      root: {
        color:"#999999",
      },
    }
}
const themes = createMuiTheme(
      {
        typography: typography,
        palette:color.palette,
        overrides : overrides,
      }
    );
export default themes;