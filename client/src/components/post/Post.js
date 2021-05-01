import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'

import Spinner from '../layout/Spinner'
import Pagination from '../layout/Pagination'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPost, post: { post, loading }, match, profile: { profiles } }) => {
    const [pageNumber, setPageNumber] = useState(0)

    const postsPerPage = 7
    const pagesVisited = pageNumber * postsPerPage

    const pageCount = post === null ? 0 : Math.ceil(post.comments.length / postsPerPage)

    const displayPosts = post === null ? [] :
        post.comments
        .slice(pagesVisited, pagesVisited + postsPerPage)
        .map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} hasProfile={profiles.filter(profile => profile.user.name === post.name).length > 0 ? true : false} />
        ))

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    
    useEffect(() => {
        getPost(match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        loading || post === null ? 
            <Spinner />
        :
            <Fragment>
                <Link to="/posts" className="btn">
                    Posts
                </Link>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <div className="comments" data-test="comments-allComments">
                    {
                        displayPosts
                    }
                </div>
                <Pagination pageCount={pageCount} changePage={changePage} />
            </Fragment> 
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ post, profile }) => ({
    post,
    profile
})

export default connect(mapStateToProps, { getPost })(Post)
