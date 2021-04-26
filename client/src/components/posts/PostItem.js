import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({ addLike, removeLike, deletePost, auth, post: { _id, text, name, avatar, user, likes, comments, date }, showActions, hasProfile }) => {   
    return (
        <div className="post bg-white p-1 my-1" data-test={`post-${_id}`}>
            <div>
                {hasProfile ? (
                    <Link to={`/perfil/${user}`}>
                        <img className="round-img" src={avatar} alt="" data-test="post-avatar" />
                        <h4 data-test="post-profileLink">{name}</h4>
                    </Link>
                ) : (
                    <Fragment>
                        <img className="round-img" src={avatar} alt="" data-test="post-avatar" />
                        <h4 data-test="post-profileNoLink">{name}</h4>
                    </Fragment>
                )}
                
            </div>
            <div>
                <p className="my-1" data-test="post-description">
                    {text}
                </p>
                <p className="post-date" data-test="post-date">
                    Postado em <Moment format="DD/MM/YYYY">{date}</Moment>
                </p>

                {showActions && 
                    <Fragment>
                        <button onClick={e => addLike(_id)} type="button" className="btn btn-light" data-test="post-like">
                            <i className="fas fa-thumbs-up"></i>
                            {likes.length > 0 && <span> {likes.length}</span>}
                        </button>
                        <button onClick={e => removeLike(_id)} type="button" className="btn btn-light" data-test="post-unlike">
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary" data-test="post-comment">
                            Comentários {comments.length > 0 && <span className='comment-count' data-test="post-commentCount"> {comments.length}</span>}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                            <button onClick={e => deletePost(_id)} type="button" className="btn btn-danger" data-test="post-delete">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                    </Fragment>
                }
            </div>
        </div>
    )
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
