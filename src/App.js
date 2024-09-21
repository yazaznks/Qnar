//import logo from './logo.svg';
import { Route, Router } from "wouter";
import React, { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "@fontsource/quicksand";
import './App.css';
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/PageLanding"
import Games from "./pages/Games"
import GamePage from "./pages/GamePage"
import Dashboard from "./pages/Dashboard"
import { useTranslation } from 'react-i18next';


function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  }, [i18n.language]);
  const theme = createTheme({

    typography: {
      direction: i18n.language === 'ar' ? 'rtl' : 'ltr', // RTL for Arabic
      fontFamily: 'Quicksand',  // Set global font family
    
    },

});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
{/* <I18nextProvider i18n={i18n}></I18nextProvider> */}
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
