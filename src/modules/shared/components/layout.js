import React from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import styled, { withTheme } from 'styled-components';

import { backgroundColor, backgroundColorAccent1, textColor } from './theme';

const SLayout = (props) => {
    const { shared: { mode }, children, toggleThemeMode } = props;

    const toggleMode = () => {
        toggleThemeMode();
    }

    const isChecked = () => {
        let checked = false
        if (mode !== null) {
            checked = mode !== 'light';
        }
        return checked
    }

    const Div = styled.div`
        background-color: ${backgroundColorAccent1};
        font-family: 'Work Sans', sans-serif;
        min-height: 100vh;
        padding-top: 64px;

        nav {
            background-color: ${backgroundColor};

            .navbar-brand {
                color: ${textColor};
            }

            .toggle-states {
                color: ${textColor};
            }
        }
    `;

    return (<Div>
        <nav className="navbar navbar-light shadow  fixed-top">
            <span className="navbar-brand text-bio"><strong>GitRepo</strong></span>
            <div className="d-flex flex-row">
                <span className="toggle-states pr-2"><strong>Light</strong></span>
                <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitch1" onChange={toggleMode} checked={isChecked()} />
                    <label className="custom-control-label toggle-states" htmlFor="customSwitch1">
                        <strong>Dark</strong>
                    </label>
                </div>
            </div>
        </nav>
        <div className="px-3 pt-2 pb-4 container">
            {children}
        </div>
    </Div>);
}

function mapStateToProps(state) {
    return {
        shared: state.shared,
    }
}

export const Layout = connect(mapStateToProps, actions)(withTheme(SLayout));