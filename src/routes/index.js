import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router';

import { Repos, AddRepo } from 'modules/repositories/components';
import { Layout } from 'modules/shared/components';


class Routes extends Component {
    componentDidMount() {
        this.appInstantiater();
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if (location !== prevProps.location) this.appInstantiater();
    }

    appInstantiater = () => {
        const { location } = this.props;
        const activePage = location.pathname;
        this.handleHomeRoute(activePage);
    };

    handleHomeRoute = currentPage => {
        const { history } = this.props;

        switch (currentPage) {
            case '/':
                history.push({ pathname: '/home' });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Layout>
                <Route
                    render={() => (
                        <Switch>
                            <Route path="/home" component={Repos} />
                            <Route path="/repos/add-repo" exact component={AddRepo} />
                            <Redirect to="/home" />
                        </Switch>
                    )}
                >
                </Route>
            </Layout>
        )
    }

}

Routes.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(Routes);