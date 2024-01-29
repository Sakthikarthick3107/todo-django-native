import {createStore , combineReducers , applyMiddleware} from 'redux';
import authReducer, { loadUserDataFromStorage } from './reducers';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    auth : authReducer
})

const store = createStore(rootReducer ,applyMiddleware(thunk));
store.dispatch(loadUserDataFromStorage());

export default store;