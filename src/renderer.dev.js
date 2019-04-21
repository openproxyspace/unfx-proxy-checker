import React from 'react';
import ReactDOM from 'react-dom';
import Main from './containers/Main';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store/index';

const root = document.getElementById('root');

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Main />
            </Provider>
        </AppContainer>,
        root
    );
};

render();

if (module.hot) {
    module.hot.accept('./containers/Main', render);
}
