import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'

import Spinner from '../layout/Spinner'

const ProfileGithub = ({ username, getGithubRepos, repos, error }) => {
    useEffect(() => {
        getGithubRepos(username)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        error && error.status === 403 ? 
        <div data-test="profile-gitHub">
            <h2 className="text-primary my-1">Repositórios GitHub</h2>
            <p className="Lead">Limite de taxa de uso da API do GitHub excedido. Aguarde alguns minutos</p>
        </div>
        :
        <div className="profile-github" data-test="profile-gitHub">
            <h2 className="text-primary my-1">Repositórios GitHub</h2>
            {repos === null ? <Spinner /> : (
                repos.map(repo => (
                    <div key={repo.id} className="repo bg-white p-1 my-1" data-test={`repo-${repo.id}`}>
                        <div>
                            <h4>
                                <a href={repo.html_url} targe='_blank' rel='noopener noreferrer' data-test="repo-url">
                                    {repo.name}
                                </a>
                            </h4>
                            <p data-test="repo-description">{repo.description}</p>
                        </div>
                        <div>
                            <ul data-test="repo-badgets">
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
    error: PropTypes.object
}

const mapStateToPros = ({ profile: { repos, error } }) => ({
    repos, error
})

export default connect(mapStateToPros, { getGithubRepos })(ProfileGithub)
