import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
    const [text, setText] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        addPost({ text })
        setText('')
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Compartilhe algo...</h3>
            </div>
            <form className="form my-1" onSubmit={e => handleSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Criar um post"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                    data-test="post-text"
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Postar" data-test="post-submit" />
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
