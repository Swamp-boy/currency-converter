import React from 'react';
import { Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import ConvertPage from './ConvertPage/ConvertPage';
import { Switch } from 'react-router';
import ListPage from './ListPage/ListPage';

const AppRoutes: React.FC<RouteComponentProps> = ({ match: { path }, location: { pathname } }) => {
    console.log(`${path}list`);

    return (
        <Switch>
            {pathname[pathname.length - 1] !== '/' && (
                <Redirect from={pathname} to={`${pathname}/`} exact />
            )}

            <Route path={`${path}`} exact strict component={withRouter(ConvertPage)} />

            <Route path={`${path}list`} strict component={withRouter(ListPage)} />

            <Redirect path={path} to={`${path}`} />
        </Switch>
    );
};

export default withRouter(AppRoutes);
