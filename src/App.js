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
    <Route path="/Qnar" component={Home} />
    <Route path="/#" component={Games} />
    <Route path="/#" component={Login} />
    <Route path="/#" component={Signup} />
    <Route path="/#" component={GamePage} />
    <Route path="/#" component={Dashboard} /> 
      <Footer/>
    </Router>
  );
}

export default App;
