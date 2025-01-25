import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1E1E1E', // VS Code dark background
      paper: '#252526',   // VS Code sidebar background
    },
    primary: {
      main: '#9580FF',    // Obsidian-like accent color
    },
    text: {
      primary: '#D4D4D4', // VS Code text color
      secondary: '#808080',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#252526',
          borderRight: '1px solid #383838',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderBottom: '1px solid #383838',
        },
      },
    },
  },
});