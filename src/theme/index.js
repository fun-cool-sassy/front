import { createMuiTheme } from "@material-ui/core/styles";
const color = {
  palette: {
    primary: {
      main: '#420806',
      contrastText: 'white'
    },
    secondary: {
      main: '#888888',
      contrastText: "black"
    },
    background:{
      default:'#420806',
    },
    text:{
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
      primary: "#212121",
      secondary: "#212121",
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
        color:"#212121",
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