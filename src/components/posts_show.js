import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { post } = this.props; // This line is ES6 syntax and it is equivalent to: const post = this.props.post;

    if (!post){
      return <div>Loading...</div>
    }

    return (
      <div>
        <div>
          <h3>{post.title}</h3>
          <h6>Category: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
        <div>
          <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete</button>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
