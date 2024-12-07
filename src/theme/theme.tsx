import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#000000FF' },
        secondary: { main: '#ff9800' },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h5: { fontWeight: 600 },
        h6: { fontFamily: 'Playwrite GB S, sans-serif', color: 'white'},
    },
});

export default theme;