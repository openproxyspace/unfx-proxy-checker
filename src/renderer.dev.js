import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './containers/Main';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AppContainer>
        <Provider store={store}>
            <Main />
        </Provider>
    </AppContainer>
);

if (module.hot) {
    module.hot.accept('./containers/Main', render);
}
