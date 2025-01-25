import { ThemeProvider, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import Editor from './components/Editor';
import { theme } from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Editor />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
