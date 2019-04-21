import { combineReducers } from 'redux';
import checking from './checking';
import input from './input';
import update from './update';
import result from './result';
import overlay from './overlay';
import core from './core';
import judges from './judges';
import ip from './ip';
import blacklist from './blacklist';
import main from './main';

const mainReducer = combineReducers({
    checking,
    input,
    result,
    overlay,
    update,
    core,
    judges,
    ip,
    blacklist,
    main
});

export default mainReducer;
