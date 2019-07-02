import { backgroundColor, textColor } from 'modules/shared/components/theme';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import styled, { css } from 'styled-components';
import { isEmpty, isObject, stripValues } from 'transformers';

const SAddRepo = props => {
    const { repo: { repos, repoForm }, fetchRepos, updateRepoForm } = props;

    useEffect(() => {
        const fetchingRepos = async () => {
            return await fetchRepos();
        }
        if (isEmpty(repos)) {
            fetchingRepos();
        }
    }, [repoForm]);

    const options = stripValues(repos, 'primaryLanguage');

    const Div = styled.div`
        .form-container {
            min-height: 80vh;
            background-color: ${backgroundColor};
            color: ${textColor};

            .form-control {
                outline: none;
                border: 2px solid #e5e4e1;
                border-top: 0px;
                border-left: 0px;
                border-right: 0px;

                &:focus {
                    box-shadow: none;
                    border-color:none;
                }
            }
        }   
    `;

    const Option = styled.option`
        ${props => props.c && css`
            color: ${props.c};
        `}
    `;

    const changeHandler = (e, propName) => {
        let value = e.target.value;
        let formVal = {};
        console.log
        if (isObject(value)) {
            value = JSON.parse(value);
        }
        formVal = {
            [`${propName}`]: value,
        }
        updateRepoForm({ formVal });
    }

    const toggleHandler = () => {
        const formVal = {
            'isPrivate': !repoForm.isPrivate,
        };
        updateRepoForm({ formVal });
    }

    return (
        <Div className="row justify-content-md-center px-3">
            <div className="col-lg-6 col-md-10 col-12 form-container pt-4 pb-5 rounded">
                <span className="font-weight-bolder text-bio">Add a Repository</span>
                <form className="pt-3">
                    <div className="row">
                        <div className="col-12 pb-2">
                            <input type="text" value={repoForm.name}
                                onChange={(e) => changeHandler(e, 'name')}
                                className="form-control is-valid rounded-0 bg-grey-300 text-grey-900"
                                placeholder="Repo name"
                                required />
                            <div className="invalid-feedback">
                                Please provide a name for the repository
                            </div>
                        </div>
                        <div className="col-12 pb-2">
                            <textarea value={repoForm.description}
                                onChange={(e) => changeHandler(e, 'desctiption')} className="form-control is-invalid rounded-0 bg-grey-300 text-grey-900" rows="3" placeholder="Repo description"></textarea>
                            <div className="invalid-feedback">
                                Please provide a description
                            </div>
                        </div>
                        <div className="col-6 pb-2">
                            <select value={JSON.stringify(repoForm.primaryLanguage)} className="form-control rounded-0 bg-grey-300" onChange={(e) => changeHandler(e, 'primaryLanguage')}>
                                <option value={JSON.stringify({ name: '', color: '' })}>Primary Language</option>
                                {
                                    options.map((option, index) => (
                                        <Option value={JSON.stringify(option)} key={index} c={option.color}>
                                            {
                                                option.name
                                            }
                                        </Option>
                                    ))
                                }
                            </select>
                            <div className="invalid-feedback">
                                Please select a language
                            </div>
                        </div>
                        <div className="col-6 pb-2">
                            <div className="d-flex flex-row">
                                <span className="toggle-states pr-2"><strong>Public</strong></span>
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="private-status" onChange={toggleHandler} checked={repoForm.isPrivate} />
                                    <label className="custom-control-label toggle-states" htmlFor="private-status">
                                        <strong>Private</strong>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 pb-2">
                            <span>Repo Owner information</span>
                        </div>
                        <div className="col-12 pb-2">
                            <input value={repoForm.owner.login}
                                onChange={(e) => changeHandler(e, 'owner.login')} type="text" className="form-control rounded-0 bg-grey-300 text-grey-900" placeholder="Username" />
                            <div className="invalid-feedback">
                                Please tell us your name
                            </div>
                        </div>
                        <div className="col-12">
                            <input type="url" onChange={(e) => changeHandler(e, 'owner.avatarUrl')} value={repoForm.owner.avatarUrl} className="form-control rounded-0 bg-grey-300 text-grey-900" placeholder="Picture Url" />
                            <div className="invalid-feedback">
                                Kindly add your image
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Div>
    )
}

function mapStateToProps(state) {
    return {
        repo: state.repo
    }
}

export const AddRepo = connect(mapStateToProps, actions)(SAddRepo);