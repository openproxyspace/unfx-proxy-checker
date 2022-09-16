import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './containers/Main';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Main />
    </Provider>
);
