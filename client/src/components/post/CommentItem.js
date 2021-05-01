import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteComment } from '../../actions/post'

const CommentItem = ({ postId, comment: { _id, text, name, avatar, user, date }, auth, hasProfile, deleteComment }) => {
    return (
        <div className="post bg-white p-1 my-1" data-test={`comment-${_id}`}>
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
            <p className="my-1" data-test="comment-description">
              {text}
            </p>
             <p className="post-date" data-test="comment-date">
                Postado em <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteComment(postId, _id)} type='button' className="btn btn-danger" data-test="comment-delete">
                    <i className="fas fa-times"></i>
                </button>
            )}
        </div>
    </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
    auth,
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
