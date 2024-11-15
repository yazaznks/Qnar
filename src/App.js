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
import Zoom from "./pages/GameWithZoom"
import GamePage from "./pages/GamePage"
import Dashboard from "./pages/Dashboard"
import { useTranslation } from 'react-i18next';
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import GameChoose from "./pages/GameChoose";
import PlayGame from "./pages/PlayGame";
import PlayGameTesting from "./pages/PlayGameTesting";
import ClickPick from "./pages/games/ClickPick";
function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

  }, [i18n.language]);
  const theme = createTheme({

    typography: {
      fontFamily: i18n.language === 'ar' ? 'tajawal': 'Quicksand',
      direction: i18n.language === 'ar' ? 'rtl' : 'ltr', // RTL for Arabic

      components: {
        MuiCssBaseline: {
          styleOverrides: `
            html {
              -webkit-text-size-adjust: 100%;
              text-size-adjust: 100%;
            }
          `,
        },
      },
   
    
    },

});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
{/* <I18nextProvider i18n={i18n}></I18nextProvider> */}
    <Router>
      <Header/>
    <Route path="/" component={Home} />
    <Route path="/about" component={AboutUs} />
    <Route path="/contact" component={ContactUs} />
    <Route path="/ai" component={Zoom} />
    <Route path="/Games" component={Games} />
    <Route path="/GameSelect" component={GameChoose} />

    <Route path="/PlayGame/:id" component={PlayGame} />
    <Route path="/PlayGame" component={PlayGameTesting} />
    <Route path="/ClickPick" component={ClickPick} />



    <Route path="/Login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/createGame" component={GamePage} />
    <Route path="/#" component={Dashboard} /> 
      <Footer/>
    </Router>
    </ThemeProvider>
  );
}

export default App;
