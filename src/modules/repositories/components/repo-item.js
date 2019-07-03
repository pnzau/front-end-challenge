import { backgroundColor, textColor } from 'modules/shared/components/theme';
import React from 'react';
import { rubberBand } from 'react-animations';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import styled, { keyframes } from 'styled-components';
import { daysAgo } from 'transformers';

const rubberBandAnimation = keyframes`${rubberBand}`;

const SRepoItem = (props) => {
    const { repo: {
        owner,
        name,
        pushedAt,
        forkCount,
        stargazers,
        description,
        isPrivate,
        primaryLanguage
    }, deleteRepo } = props;

    const isCheckedAsPrivate = () => {
        let checked = false;
        if (isPrivate) {
            checked = true;
        }
        return checked;
    }

    const removeRepository = async () => {
        const { repo } = props;
        await deleteRepo(repo);
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
            cursor: pointer;
              &:hover {
                animation: 1s ${rubberBandAnimation};
            }
        }
    `;
    return (
        <Div className="rounded d-flex flex-column pt-2 pb-4 px-3 mb-2">
            <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="title text-uppercase font-weight-bold mb-0">
                    <strong>
                        {name}
                    </strong>
                </span>
                <strong>
                    <i
                        role="button"
                        onClick={removeRepository}
                        className="material-icons text-blue-900 delete-btn">close</i>
                </strong>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between w-100 pt-2">
                <div className="d-flex flex-row align-items-center">
                    <img className="img-fluid img-shape rounded-circle" src={owner.avatarUrl} alt="" />
                    <div className="d-flex flex-column align-items-center pl-3">
                        <p className="text-small text-left text-capitalize mb-0 w-100 font-weight-bold">
                            {owner.login}
                        </p>
                        <p className="text-small text-left pt-3 mb-0 w-100 font-weight-bold">
                            Pushed {daysAgo(pushedAt)}
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
                    <span className="text-small text-900">{stargazers.totalCount}</span>
                    <i className="material-icons text-gold" data-toggle="tooltip" data-placement="top" title="Stargazers">grade</i>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-start pl-3">
                    <span className="text-small text-900">{forkCount}</span>
                    <i className="material-icons text-900" data-toggle="tooltip" data-placement="top" title="Forks">call_split</i>
                </div>
            </div>
        </Div>);
}

export const RepoItem = connect(null, actions)(SRepoItem);