import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profile'

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(({ _id, company, title, from, to }) => (
        <tr key={_id} data-test={`experience-${_id}`}>
            <td>{company}</td>
            <td className="hide-sm">{title}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{from}</Moment> - {
                    to === null ? ('Atual') : (<Moment format="DD/MM/YYYY">{to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteExperience(_id)} data-test="experience-delete">Excluir</button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="my-2">Experiências</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th className="hide-sm">Posição</th>
                        <th className="hide-sm">Período</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience)
