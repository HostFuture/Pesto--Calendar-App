import React from 'react';
import './App.css';
import Header from "./components/header";
import Tooltip from '@mui/material/Tooltip';
import Dashboard from './components/dashboard';
import IconButton from '@mui/material/IconButton';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import { ThemeProvider, createTheme, responsiveFontSizes, useTheme } from '@mui/material/styles';


const ColorModeContext = React.createContext();
function ModeChangeButton() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return(
    <Tooltip title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'} color='inherit'>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <LightModeTwoToneIcon color='primary'/> : <DarkModeTwoToneIcon color='dark' />}
      </IconButton>
    </Tooltip>
  );
}

function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>

        <Header mode={ModeChangeButton} />
        <Dashboard color={ mode === 'light' ? '#E3F2FD' : '#263238' }/>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
