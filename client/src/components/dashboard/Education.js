import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education, deleteEducation }) => {
    const educations = education.map(({ _id, school, degree, from, to }) => (
        <tr key={_id} data-test={`education-${_id}`}>
            <td>{school}</td>
            <td className="hide-sm">{degree}</td>
            <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{from}</Moment> - {
                    to === null ? ('Atual') : (<Moment format="DD/MM/YYYY">{to}</Moment>)
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteEducation(_id)} data-test="education-delete">Excluir</button>
            </td>
        </tr>
    ))

    return (
        <Fragment>
            <h2 className="my-2">Formações Acadêmicas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Escola</th>
                        <th className="hide-sm">Grau</th>
                        <th className="hide-sm">Período</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
