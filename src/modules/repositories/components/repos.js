import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import { isEmpty } from 'transformers';
import { RepoItem } from './repo-item';
import styled from 'styled-components';
import { backgroundColor, SearchBar } from 'modules/shared/components';
import { history } from 'helpers';

const SRepos = (props) => {
    const { repo: { repos }, fetchRepos, searchRepo } = props;

    useEffect(() => {
        const fetchingRepos = async () => {
            return await fetchRepos();
        }
        if (isEmpty(repos)) {
            fetchingRepos();
        }
    }, [repos, fetchRepos]);

    const goToAddRepoPage = () => {
        history.push({
            pathname: '/repos/add-repo'
        });
    }

    const handleSearch = (val) => {
        searchRepo({ searchTerm: val });
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
        <SearchBar placeholder="Search here ..." handleSearch={handleSearch} />
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