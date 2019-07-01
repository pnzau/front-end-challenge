import React from 'react';
import styled from 'styled-components';
import { backgroundColor, textColor } from 'modules/shared/components/theme';

export const RepoItem = (props) => {
    const { repo: { owner, name, pushedAt, forkCount, stargazers, description, isPrivate, primaryLanguage } } = props;

    const isCheckedAsPrivate = () => {
        const checked = false;
        if (isPrivate) {
            checked = true;
        }
        return checked;
    }

    const Div = styled.div`
        font-size: 16px;
        background-color: ${backgroundColor};
        color: ${textColor};

        .title {
            font-size: 22px;
        }
        .text-small {
            font-size: 14px;
        }

        .img-shape {
            width: 55px;
            height: 55px;
        }

        .lang-bar {
            width: 150px;
            height: 5px;
            background-color: ${primaryLanguage.color};
        }

        .material-icons {
            font-size: 24px;
        }
    `;
    return (
        <Div className="rounded d-flex flex-column pt-2 pb-4 px-3 mb-2">
            <p className="title text-uppercase font-weight-bold mb-0">
                <strong>
                    {name}
                </strong>
            </p>
            <div className="d-flex flex-row align-items-center justify-content-between w-100 pt-2">
                <div className="d-flex flex-row align-items-center">
                    <img className="img-fluid img-shape rounded-circle" src={owner.avatarUrl} />
                    <div className="d-flex flex-column align-items-center pl-3">
                        <p className="text-small text-left text-capitalize mb-0 w-100 font-weight-bold">
                            {owner.login}
                        </p>
                        <p className="text-small text-left pt-3 mb-0 w-100 font-weight-bold">
                            Pushed {pushedAt}
                        </p>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="lang-bar"></div>
                    <span className="text-small text-left w-100 pt-3 font-weight-bold">
                        {primaryLanguage.name}
                    </span>
                </div>
            </div>
            <p className="font-weight-bold pt-3">
                {description}
            </p>
            <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-row">
                    <span className="toggle-states pr-2"><strong>Public</strong></span>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1" readOnly={true} checked={isCheckedAsPrivate()} />
                        <label className="custom-control-label toggle-states" htmlFor="customSwitch1">
                            <strong>Private</strong>
                        </label>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start pl-3">
                    <span className="text-small text-blue-800">{stargazers.totalCount}</span>
                    <i className="material-icons text-gold">grade</i>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start pl-3">
                    <span className="text-small text-blue-800">{forkCount}</span>
                    <i className="material-icons text-blue-900">call_split</i>
                </div>
            </div>
        </Div>);
}