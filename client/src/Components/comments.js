import React from "react";
import { connect } from "react-redux";
import * as actionCreator from "../Store/Actions/actions";

const cityURL = window.location.pathname.split("/")[2];

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        comment: "",
        comments: this.props.comments,
        commentError: ""
    };
    this.itineraryId = this.props.itineraryId;
  }

  componentDidMount() {
    this.props.getComments(this.itineraryId);
  }

  emptyTextInput() {
    document.getElementById("textInput").value = "";
}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      isLoading: true
    });

    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body:
        "message=" + this.state.comment + "&itineraryId=" + this.props.itineraryId
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            commentError: json.message,
            isLoading: false,
            comment: "",
          });
          {this.props.getComments(this.itineraryId)}
          {this.emptyTextInput()}
        } else {
          this.setState({
            commentError: json.message,
            isLoading: false
          });
        }
      });
  }

  render() {
    if (this.props.commentsIsLoading) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <form className="comments_form" onSubmit={this.handleSubmit}> 
          <input
            type="text"
            placeholder="Your comment..."
            className="comments_input"
            onChange={this.handleChange}
            name="comment"
            id="textInput"
          />
          <button
            type="submit"
            className="comments_submitbutton"
          ><i className="far fa-paper-plane"></i></button>
        </form>

        <div className="comments_box">
        {this.props.comments == "Error: No comments found" ? (
          <span className="comments_notfound_text">Be the first to comment!</span>
        ) : (
          <div>
            {this.props.comments.reverse().map((item, index) => (
              <div key={index} className="comments">{item.post}</div>
            ))}
          </div>
        )}
        </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.message,
    commentsIsLoading: state.commentsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getComments: id => dispatch(actionCreator.fetchComments(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
