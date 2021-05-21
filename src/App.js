
import Routes from './routes/Routes';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled,{ThemeProvider,createGlobalStyle} from "styled-components";
import { ThemeProvider as MuiThemeProvider,createMuiTheme} from "@material-ui/core/styles";

import { green, grey, indigo, red, teal } from "@material-ui/core/colors";

import themes from './theme';
const GlobalStyle = createGlobalStyle` 
body {
  @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
  font-family: 'Noto Sans KR', sans-serif;
}
  body,html { margin: 0; }
  a{
    text-decoration:none
  }
`
function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={themes}> 
      {console.log(MuiThemeProvider)}
          <ThemeProvider theme={themes}>
              <GlobalStyle/>
              <Routes {...themes}/>
              </ThemeProvider>
              </MuiThemeProvider>
      </BrowserRouter>
  );
}

export default App;
