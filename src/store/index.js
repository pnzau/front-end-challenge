import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import rootReducer from './rootReducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
    const logger = createLogger({
        collapsed: true,
        diff: true
    });
    middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
