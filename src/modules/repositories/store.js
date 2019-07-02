import * as types from 'store/actionTypes';
import { isNill } from 'transformers';

const initialRepoForm = {
    name: '',
    description: '',
    primaryLanguage: {
        name: '',
        color: '',
    },
    isPrivate: false,
    owner: {
        login: '',
        avatarUrl: '',
    },
    pushedAt: '',
    forkCount: 0,
    stargazers: {
        totalCount: 0
    }
}

export const initialState = {
    repoForm: { ...initialRepoForm },
    repos: [],
    selectedRepo: {},
}

export const reducer = (state = initialState, action) => {
    let repos = [];
    let selectedRepo = {};
    let repoForm = { ...initialRepoForm };

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
        case types.UPDATE_REPO_FORM: {
            const { payload: { formVal, empty } } = action;
            if (isNill(empty)) {
                repoForm = { ...state.repoForm, ...formVal };
            }
            return {
                ...state,
                repoForm,
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
    },
    updateRepoForm: payload => dispatch => {
        dispatch({
            type: types.UPDATE_REPO_FORM,
            payload,
        });
    }
}


export default {
    actions,
    reducer,
    initialState,
};