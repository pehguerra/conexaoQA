import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import { getProfiles } from '../../actions/profile'

import Spinner from '../layout/Spinner'
import Pagination from '../layout/Pagination'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Posts = ({ getPosts, getProfiles, post: { posts, loading }, profile: { profiles } }) => {
    const [pageNumber, setPageNumber] = useState(0)

    const postsPerPage = 7
    const pagesVisited = pageNumber * postsPerPage

    const pageCount = Math.ceil(posts.length / postsPerPage)

    const displayPosts = posts
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map(post => (
            <PostItem key={post._id} post={post} hasProfile={profiles.filter(profile => profile.user.name === post.name).length > 0 ? true : false} />
        ))

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    
    useEffect(() => {
        getProfiles()
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
            <div className="posts" style={{ marginBottom: '20px' }} data-test="posts-allPosts">
                {
                    displayPosts
                }
            </div>
            <Pagination pageCount={pageCount} changePage={changePage} />
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = ({ post, profile }) => ({
    post,
    profile
})

export default connect(mapStateToProps, { getPosts, getProfiles })(Posts)
