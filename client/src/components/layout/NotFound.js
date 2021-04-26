import React, { Fragment } from 'react'

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary" data-test="notFound-404">
                <i className="fas fa-exclamation-triangle"></i> 404 - Página Não Encontrada
            </h1>
            <p className="large" data-test="notFound-description">Desculpe, esta página não existe</p>
        </Fragment>
    )
}

export default NotFound
