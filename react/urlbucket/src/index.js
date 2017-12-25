import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App/App';
import SignUp from './App/SignUp';
import Login from './App/Login';

import './main.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/" exact={true} component={App} />
        </div>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
