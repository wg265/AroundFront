import React, {Component} from 'react';
import Login from './Login';
import Home from "./Home";
import Register from './Register';
import {Switch, Route, Redirect} from "react-router-dom";

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path = "/login" render={this.getLogin}/>
                    <Route path = "/register" component = {Register}/>
                    <Route path = "/home" render={this.getHome}/>
                    <Route render = {this.getLogin}/>
                </Switch>
            </div>
        );
    }
    getLogin=()=>{
        console.log('in get login fn');
        return this.props.isLoggedIn ? <Redirect to = "/home"/> :
            <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }
    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to = "/login"/>;
    }
}

export default Main;

