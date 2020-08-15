import React, {Component} from 'react';
import '../sytles/App.css';
import TopBar from './TopBar';
import Main from './Main';
import {TOKEN_KEY} from "../constants";
class App extends Component{
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY))
    }
    render(){
  return (
    <div className= "App">
      <TopBar isLoggedIn = {this.state.isLoggedIn}
        handleLogout = {this.handleLogout}
      />
      <Main handleLoginSucceed = {this.handleLoginSucceed}
        isLoggedIn = {this.state.isLoggedIn}
      />
    </div>
  );
}
    handleLoginSucceed = (token) => {
        console.log(token)
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({
            isLoggedIn: true
        });
    }
    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({
            isLoggedIn : false
        });
    }
}
export default App;
