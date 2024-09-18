//import logo from './logo.svg';
import { Route, Router } from "wouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "@fontsource/quicksand";
import './App.css';
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/pageLanding"
import Games from "./pages/Games"
import GamePage from "./pages/GamePage"
import Dashboard from "./pages/Dashboard"


const theme = createTheme({

    // typography: {
    //   fontFamily: 'sans-serif',  // Set global font family
    
    // },

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Header/>
    <Route path="/" component={Home} />
    <Route path="/#" component={Games} />
    <Route path="/#" component={Login} />
    <Route path="/#" component={Signup} />
    <Route path="/#" component={GamePage} />
    <Route path="/#" component={Dashboard} /> 
      <Footer/>
    </Router>
    </ThemeProvider>
  );
}

export default App;
