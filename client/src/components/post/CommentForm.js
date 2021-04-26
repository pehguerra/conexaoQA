import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        addComment(postId, { text })
        setText('')
    }


    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Deixe um comentário...</h3>
            </div>
            <form className="form my-1" onSubmit={e => handleSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Adicionar um comentário"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                    data-test="comment-text"
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Adicionar" data-test="comment-submit" />
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)
