import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class PostsNew extends Component {
  render() {
    return (
      <form>
        <h3>Create Post</h3>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" />

          <label>Categories</label>
          <input type="text" className="form-control" />

          <label>Content</label>
          <textarea type="text" className="form-control" />

          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content']
})(PostsNew);
