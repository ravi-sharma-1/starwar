// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx';
import Utility from './utils/Utils';
import { Router, Route, IndexRoute, useRouterHistory, hashHistory } from 'react-router';
import { createBrowserHistory } from 'react-router/lib/createRouterHistory';
import { createHashHistory } from 'history';


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
var someAuthCheck = function(nextState, transition) {
    let getUserInfo = Utility.util.getAuInfor()?Utility.util.getAuInfor():[]
    if(getUserInfo.length>0){
    }else{
        transition("/")
    }
}
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={ App }/>
        <Route path="/home" component={ Home } onEnter={someAuthCheck}/>
    </Router>,
    document.getElementById('react-root')
);
