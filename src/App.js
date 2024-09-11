import logo from './logo.svg';
import { Link, Route, Router } from "wouter";

import './App.css';
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/pageLanding"
import Games from "./pages/Games"
import GamePage from "./pages/GamePage"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <Header/>
    <Route path="/" component={Home} />
    <Route path="/Games" component={Games} />
    <Route path="/Login" component={Login} />
    <Route path="/Signup" component={Signup} />
    <Route path="/game" component={GamePage} />
    <Route path="/Dashboard" component={Dashboard} /> 
      <Footer/>
    </Router>
  );
}

export default App;
