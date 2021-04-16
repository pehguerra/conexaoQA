import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'

import Spinner from '../layout/Spinner'

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
    useEffect(() => {
        getGithubRepos(username)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Repositórios GitHub</h2>
            {repos === null ? <Spinner /> : (
                repos.map(repo => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a href={repo.html_url} targe='_blank' rel='noopener noreferrer'>
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
}

const mapStateToPros = ({ profile: { repos } }) => ({
    repos
})

export default connect(mapStateToPros, { getGithubRepos })(ProfileGithub)
