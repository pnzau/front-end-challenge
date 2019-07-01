import repo from 'modules/repositories/store';
import shared from 'modules/shared/store';
import { routerReducer as routing } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
    key: 'primary',
    storage,
};

const rootReducer = persistCombineReducers(config, {
    routing,
    shared: shared.reducer,
    repo: repo.reducer,
});

export default rootReducer;
