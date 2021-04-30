import './App.css';
import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import { getCookie } from './utils/cookies'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Routes from './components/routing/Routes'


const App = () =>{
    useEffect(() => {
        if(getCookie('jwt')) {
            setAuthToken(getCookie('jwt'));
            store.dispatch(loadUser())
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    )
}

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store
}

export default App;