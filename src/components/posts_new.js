import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        //New path to navigate
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-danger">{title.touched ? title.error : ''}</div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-danger">{categories.touched ? categories.error : ''}</div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-danger">{content.touched ? content.error : ''}</div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">Save</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title must be informed';
  }
  if (!values.categories) {
    errors.categories = 'Categories must be informed';
  }
  if (!values.content) {
    errors.content = 'Content must be informed';
  }

  return errors;
}

// connect: 1st argumment is mapStateToProps, 2nd argumment is mapDispatchToProps Exemple: export default connect(null, { fetchPosts })(PostsIndex);
// reduxForm: 1st argumment is the form configuration, 2nd is mapStateToProps, 3rd argumment is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
