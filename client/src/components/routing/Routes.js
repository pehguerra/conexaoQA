import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Alert from '../layout/Alert'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import AddExperience from '../profile-forms/AddExperience'
import AddEducation from '../profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import NotFound from '../layout/NotFound'

const Routes = props => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/cadastrar" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/perfis" component={Profiles} />
                <Route exact path="/perfil/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/criar-perfil" component={CreateProfile} />
                <PrivateRoute exact path="/editar-perfil" component={EditProfile} />
                <PrivateRoute exact path="/adicionar-experiencia" component={AddExperience} />
                <PrivateRoute exact path="/adicionar-formacao" component={AddEducation} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes
