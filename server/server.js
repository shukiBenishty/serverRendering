import template from './template.js';
import reducers from '../jsx/reducers.jsx';
import Routes  from '../jsx/routes.jsx';
import express from 'express';
import path  from 'path';
import fs     from 'fs';
import React  from 'react';
import ReactDomServer  from 'react-dom/server';
import { StaticRouter } from 'react-router'

import {createStore} from 'redux';
import {Provider} from 'react-redux';



var app = express();

const getParameterByName = (name, url) =>
{
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function urlParams(url) {
    return {
      callback: getParameterByName('redirect_uri', url),
      grantType: getParameterByName('response_type', url),
      appId: getParameterByName('client_id', url),
      state: getParameterByName('state', url)
  }
};

function initUrlParams(url) {
  return {
    type: 'URL_PARAMS_CHANGED',
    data: urlParams(url)
  }
}



function handleRender(req, res) {

      var store = createStore(reducers);

      store.dispatch(initUrlParams(req.url));

      const preloadedState = store.getState();

      const componentHTML = ReactDomServer.renderToString(<Provider store={store}>
                                                            <StaticRouter location={req.url}>
                                                              <Routes/>
                                                            </StaticRouter>
                                                          </Provider>);
      const html = template({
        content: componentHTML,
        state: preloadedState
      });
    //  console.log(store.dispatch(initUrlParams(req.url)));
      res.status(200).send(html);
};



app.use(express.static('public'));



app.get('*', handleRender);

app.listen(3000);
