import { backgroundColor, textColor } from 'modules/shared/components/theme';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import styled from 'styled-components';
import { isEmpty, stripValues } from 'transformers';
import { history } from 'helpers';

import { AddRepoForm } from './add-repo-form';

const SAddRepo = props => {
    const { repo: { repos, repoForm, languageList }, fetchRepos, createRepo, updatePrimeLangs } = props;

    useEffect(() => {
        let isMounted = true;
        const fetchingRepos = async () => {
            return await fetchRepos();
        }
        if (isEmpty(repos) && isMounted) {
            fetchingRepos();
        }
        isEmpty(languageList) && updatePrimeLangs({ servLang: stripValues(repos, 'primaryLanguage') });

        return function cleanup() {
            isMounted = false;
        }
    }, [repoForm, fetchRepos, repos, languageList, updatePrimeLangs]);

    const handleSubmit = async (values) => {
        await createRepo(values);
        history.push({
            pathname: '/'
        });
    }

    const Div = styled.div`
        .form-container {
            min-height: 50vh;
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

    return (
        <Div className="row justify-content-md-center px-3">
            {repoForm && (<AddRepoForm languages={languageList} form={repoForm} handleSubmit={handleSubmit} />)}
        </Div>
    )
}

function mapStateToProps(state) {
    return {
        repo: state.repo
    }
}

export const AddRepo = connect(mapStateToProps, actions)(SAddRepo);