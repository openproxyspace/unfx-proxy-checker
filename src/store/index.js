import mainReducer from './reducers/';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { saveSettings } from '../core/settings.js';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(mainReducer);

store.subscribe(() => {
    saveSettings();
});

export default store;
