import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'

import Spinner from '../layout/Spinner'
import Pagination from '../layout/Pagination'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
    const [pageNumber, setPageNumber] = useState(0)

    const postsPerPage = 7
    const pagesVisited = pageNumber * postsPerPage

    const pageCount = Math.ceil(profiles.length / postsPerPage)

    const displayPosts = profiles
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
        ))

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        getProfiles()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary"><i className="fas fa-users"></i> Perfis</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"> Navegue e conecte-se com outros QAs</i>
                </p>
                <div className="profiles" data-test="profiles-allProfiles">
                    {profiles.length > 0 ? displayPosts : <h4 data-test="profiles-noProfiles">Nenhum perfil encontrado</h4>}
                </div>
                <Pagination pageCount={pageCount} changePage={changePage} />
            </Fragment> }
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ profile }) => ({
    profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
