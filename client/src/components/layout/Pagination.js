import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import ReactPaginate from 'react-paginate'

const Pagination = ({ pageCount, changePage }) => {
    return (
        <Fragment>
            { pageCount > 1 &&
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    breakLabel={'...'}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={5}
                    containerClassName={'paginationBttns'}
                    activeClassName={'activeBttn'}
                />
            }
        </Fragment>
    )
}

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default Pagination
