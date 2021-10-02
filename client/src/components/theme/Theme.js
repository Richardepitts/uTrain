import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
// const arcNew = "#6b6b77";
// const arcNew = "#6a7e94";
const arcNew = "#6a7e94";
const arcOrange = "#9ca4ac";
const arcGrey = "#868686";

export default createTheme({
  estimate: {
    fontFamily: 'Pacifico',
    fontSize: '1rem',
    textTransform: 'none',
    color: 'white'
  },
  palette: {
    common: {
      blue: arcNew,
      orange: arcOrange
    },
    primary: {
      mainOld: arcNew,
      main: arcNew,
    },
    secondary: {
      main: arcOrange
    }
  }
});
