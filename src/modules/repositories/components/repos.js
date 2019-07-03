import { history } from 'helpers';
import { backgroundColor, SearchBar } from 'modules/shared/components';
import React, { useEffect } from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';
import actions from 'store/rootActions';
import styled from 'styled-components';
import { isEmpty } from 'transformers';

import { RepoItem } from './repo-item';

const SRepos = props => {
  const {
    repo: { repos },
    fetchRepos,
    searchRepo,
    scrollPosition,
  } = props;

  useEffect(() => {
    const fetchingRepos = async () => {
      return await fetchRepos();
    };
    if (isEmpty(repos)) {
      fetchingRepos();
    }
  }, [repos, fetchRepos]);

  const goToAddRepoPage = () => {
    history.push({
      pathname: '/repos/add-repo',
    });
  };

  const handleSearch = val => {
    searchRepo({ searchTerm: val });
  };

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

  return (
    <Div className="row">
      <div className="col-12 pb-5 pt-4 justify-content-center">
        <div className="row justify-content-center align-items-center">
          <SearchBar
            placeholder="Search here ..."
            handleSearch={handleSearch}
          />
          <div className="col">
            <span className="font-weight-bold">{repos.length} Items found</span>
          </div>
        </div>
      </div>
      <div
        role="button"
        onClick={goToAddRepoPage}
        className="shadow rounded-circle text-gold floating-btn position-fixed"
      >
        <i className="material-icons p-2">add</i>
      </div>
      {repos &&
        repos.map((repository, index) => (
          <div className="col-12" key={index}>
            <RepoItem repo={{ ...repository, scrollPosition }} />
          </div>
        ))}
    </Div>
  );
};

function mapStateToProps(state) {
  return {
    repo: state.repo,
  };
}

export const Repos = connect(
  mapStateToProps,
  actions
)(trackWindowScroll(SRepos));
