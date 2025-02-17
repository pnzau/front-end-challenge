import * as types from 'store/actionTypes';
import { isNill } from 'transformers';
import _ from 'lodash';

const initialRepoForm = {
    name: '',
    description: '',
    primaryLanguage: {
        name: '',
        color: '',
    },
    isPrivate: false,
    login: '',
    avatarUrl: '',
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
    languageList: [],
}

export const reducer = (state = initialState, action) => {
    let repos = [];
    let languageList = [];
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
        case types.MANAGE_REPO: {
            const { payload: { servRepo, deleteRepo } } = action;
            if (isNill(deleteRepo)) {
                repos = _.concat(servRepo, state.repos);
            } else {
                repos = _.remove(state.repos, function (repo) {
                    return !_.eq(repo, servRepo);
                });
            }
            return {
                ...state,
                repos,
            }
        }
        case types.UPDATE_PRIME_LANG_LIST: {
            const { payload: { servLang, empty } } = action;
            if (isNill(empty)) {
                languageList = [...servLang];
            }
            return {
                ...state,
                languageList,
            }
        }
        default:
            return state;
    }
}

export const actions = {
    fetchRepos: () => dispatch => {
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
    },
    manageRepo: payload => dispatch => {
        dispatch({
            type: types.MANAGE_REPO,
            payload,
        });
    },
    createRepo: payload => dispatch => {
        dispatch(actions.manageRepo({ servRepo: payload }));
    },
    deleteRepo: payload => dispatch => {
        dispatch(actions.manageRepo({ servRepo: payload, deleteRepo: true }));
    },
    updatePrimeLangs: payload => dispatch => {
        dispatch({
            type: types.UPDATE_PRIME_LANG_LIST,
            payload,
        });
    },
    searchRepo: payload => (dispatch, getState) => {
        const { repo: { repos } } = getState();
        const { searchTerm } = payload;
        var filteredItems = _.filter(repos, function (repo) {
            return _.eq(_.lowerCase(repo.name), searchTerm)
                || _.eq(_.lowerCase(repo.description), searchTerm)
                || _.eq(_.lowerCase(repo.owner.login), searchTerm);
        });
        dispatch({
            type: types.FETCH_REPOS,
            payload: { servRepos: filteredItems }
        });
    }
}


export default {
    actions,
    reducer,
    initialState,
};