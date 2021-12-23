import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, compose} from 'redux'
import {routerMiddleware, ConnectedRouter} from 'react-router-redux'
import {Route} from 'react-router-dom'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import * as ReactGA from "react-ga";
import counterpart from "counterpart";

import createHistory from 'history/createBrowserHistory'
import './styles/styles.scss'
import reducers from './reducers'
import App from './App'
import {ru, en, ach} from "./translations";
import {getCookie} from "./actions";
import {checkCrowdin} from "./components/data_temp";

const logger = createLogger({ predicate: (getState, action) => ![].includes(action.type) });
const history = createHistory();
const middleware = routerMiddleware(history);

counterpart.registerTranslations('EN', en);
counterpart.registerTranslations('RU', ru);
counterpart.registerTranslations('ACH', ach);

let selectedLang = localStorage.getItem('language');

if(!selectedLang){
    selectedLang = 'EN';
}

if(checkCrowdin){
    selectedLang = 'ACH';

    let crowdin = document.createElement('script');
    crowdin.setAttribute('src','//cdn.crowdin.com/jipt/jipt.js');
    document.body.appendChild(crowdin);
}

counterpart.setLocale(selectedLang);

ReactGA.initialize('UA-136747315-4');
ReactGA.pageview(window.location.pathname + window.location.search);

export let store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk, middleware))
);

if (process.env.NODE_ENV !== 'production') {
    store = createStore(
        reducers,
        {},
        compose(
            applyMiddleware(thunk, /*logger,*/ middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f,
        ),
    )
}

if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer)
    })
}

const render = (Component) => {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Route component={Component}/>
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App)
    })
}
