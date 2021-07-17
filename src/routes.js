import React from 'react';
import {
    BrowserRouter as Router, 
    Switch,
    Route
} from 'react-router-dom';
import Repo from './pages/Repositories';
import Home from './pages/Home';

function Routes() {
    return(
        <Router>
            <Switch>
                <Route path='/repositories'>
                    <Repo />
                </Route>
                <Route path='/' exact>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;