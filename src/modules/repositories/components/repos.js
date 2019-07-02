import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import { isEmpty } from 'transformers';
import { RepoItem } from './repo-item';
import styled from 'styled-components';
import { backgroundColor } from 'modules/shared/components/theme';
import { history } from 'helpers';

const SRepos = (props) => {
    const { repo: { repos }, fetchRepos } = props;

    useEffect(() => {
        const fetchingRepos = async () => {
            return await fetchRepos();
        }
        if (isEmpty(repos)) {
            fetchingRepos();
        }
    }, []);

    const goToAddRepoPage = () => {
        history.push({
            pathname: '/repos/add-repo'
        });
    }

    const Div = styled.div`
        .floating-btn {
            bottom: 60px;
            right: 60px;
            z-index: 1080;
            background-color: ${backgroundColor};
            cursor: pointer;
        }

        .material-icons {
            font-size: 34px;
        }
    `;

    return (<Div className="row">
        <div role='button' onClick={goToAddRepoPage} className="shadow rounded-circle text-gold floating-btn position-fixed">
            <i className="material-icons p-2">
                add
                </i>
        </div>
        {
            repos && repos.map((repository, index) =>
                <div className="col-12" key={index}>
                    <RepoItem repo={repository} />
                </div>
            )
        }
    </Div>);
}

function mapStateToProps(state) {
    return {
        repo: state.repo,
    }
}

export const Repos = connect(mapStateToProps, actions)(SRepos);