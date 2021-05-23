import { createMuiTheme } from "@material-ui/core/styles";
const color = {
  palette: {
    primary: {
      main: '#0045FF',
      contrastText: 'white'
    },
    secondary: {
      main: '#000000',
      contrastText: "white"
    },
    background:{
      default:'#000000',
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