import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i> Página Não Encontrada
            </h1>
            <p className="large">Desculpe, esta página não existe</p>
        </Fragment>
    )
}

export default NotFound
