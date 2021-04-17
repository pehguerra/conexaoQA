import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'

import ReactPaginate from 'react-paginate'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, post: { posts, loading } }) => {
    const [pageNumber, setPageNumber] = useState(0)

    const postsPerPage = 7
    const pagesVisited = pageNumber * postsPerPage

    const pageCount = Math.ceil(posts.length / postsPerPage)

    const displayPosts = posts
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map(post => (
            <PostItem key={post._id} post={post} />
        ))

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    
    useEffect(() => {
        getPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        loading ? <Spinner /> : <Fragment>
            <h1 className="large text-primary"><i className="far fa-comments"></i> Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Bem-vindo a comunidade
            </p>
            <PostForm />
            <div className="posts" style={{ marginBottom: '20px' }}>
                {/* {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))} */}
                {
                    displayPosts
                }
            </div>
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
                    breakClassName={'paginationBreak'}
                />
            }
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = ({ post }) => ({
    post
})

export default connect(mapStateToProps, { getPosts })(Posts)
