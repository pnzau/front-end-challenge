import * as types from 'store/actionTypes';

export const initialState = {
    mode: 'light',
}

export const reducer = (state = initialState, action) => {
    let mode = 'light';

    switch (action.type) {
        case types.TOGGLE_MODE: {
            mode = state.mode === 'light' ? 'dark' : 'light';
            return {
                ...state,
                mode,
            };
        }
        default:
            return state;
    }
}

export const actions = {
    toggleThemeMode: () => dispatch => {
        dispatch({
            type: types.TOGGLE_MODE,
        });
    }
}


export default {
    actions,
    reducer,
    initialState,
};
