import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import { Provider } from 'react-redux';
import store from './store/index';

const root = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Main />
        </Provider>,
        root
    );
};

render();
