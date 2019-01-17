import mainReducer from './reducers/';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(mainReducer);

export default store;
