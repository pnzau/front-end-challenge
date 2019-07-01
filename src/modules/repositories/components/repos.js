import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import { isEmpty } from 'transformers';
import { RepoItem } from './repo-item';

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

    return (<div className="row">
        {
            repos && repos.map((repository, index) =>
                <div className="col-12" key={index}>
                    <RepoItem repo={repository} />
                </div>
            )
        }
    </div>);
}

function mapStateToProps(state) {
    return {
        repo: state.repo,
    }
}

export const Repos = connect(mapStateToProps, actions)(SRepos);