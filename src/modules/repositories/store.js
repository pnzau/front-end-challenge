import * as types from 'store/actionTypes';
import { isNill } from 'transformers';


export const initialState = {
    repos: [],
    selectedRepo: {},
}

export const reducer = (state = initialState, action) => {
    let repos = [];
    let selectedRepo = {};

    switch (action.type) {
        case types.FETCH_REPOS: {
            const { payload: { servRepos, empty } } = action;
            if (isNill(empty)) {
                repos = servRepos;
            }
            return {
                ...state,
                repos,
            }
        }
        default:
            return state;
    }
}

export const actions = {
    fetchRepos: payload => dispatch => {
        fetch('http://localhost:3000/data.json')
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: types.FETCH_REPOS,
                    payload: { servRepos: data.data.repositories }
                });
            })
            .catch(err => console.log('err gat', err));
    }
}


export default {
    actions,
    reducer,
    initialState,
};