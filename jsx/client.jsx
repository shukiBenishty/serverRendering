import App from './components/App.jsx';
import Otp from './components/Otp.jsx';
import Sms from './components/Sms.jsx';
import reducers from './reducers.jsx';
import Routes from './routes.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  BrowserRouter
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import React from 'react';
import ReactDom from 'react-dom';

const store = createStore(reducers,
                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    // Grab the state from a global variable injected into the server-generated code
    const preloadedState = window.__PRELOADED_STATE__;

    if( preloadedState ) {
        const personalId = preloadedState.personalId;
        const phone = preloadedState.phone;
        const urlParams = preloadedState.urlParams;


        // Allow the passed state to be garbage-collected
        delete window.__PRELOADED_STATE__;

        store.dispatch({
            type: 'PID_CHANGED',
            data: personalId
        });
        store.dispatch({
            type: 'PHONE_CHANGED',
            data: phone
        });
        store.dispatch({
            type: 'URL_PARAMS_CHANGED',
            data: urlParams
          });

    }


ReactDom.hydrate(<Provider store={store}>
                  <BrowserRouter>
                    <Routes/>
                  </BrowserRouter>
                </Provider>,
                              document.getElementById('container'));
