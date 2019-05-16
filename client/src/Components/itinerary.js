import React from "react";
import Activities from "../Components/Activities";
import Modal from "react-awesome-modal";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreator from "./../Store/Actions/actions";

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActivities: false,
      visible: false,
      visibleDelete: false,
      item: this.props.item, 
      favsLoaded: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.deleteFavourite = this.deleteFavourite.bind(this);
  }

  componentWillMount() {
    this.tokenState();
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    });
    if (this.state.token != null) {
      this.props.getUser(this.state.token);
    }
  }

  tokenState() {
    if (!localStorage["token"]) {
      this.setState({ token: sessionStorage["token"] });
    } else if (!sessionStorage["token"]) {
      this.setState({ token: localStorage["token"] });
    } else if (!sessionStorage["token"] && !localStorage["token"]) {
      this.setState({ token: "" });
    }
  }

  openDeleteModal() {
    this.setState({
      visibleDelete: true
    });
  }

  closeDeleteModal() {
    this.setState({
      visibleDelete: false
    });
  }

  deleteFavourite() {
    let itineraryId = this.state.item._id;
    let userId = this.state.token;
    this.setState({
      visibleDelete: false
    });

    fetch("/api/favourites/delete/" + userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "favourites=" + itineraryId
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            isLoading: false,
            favsLoaded: false,
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  } 

  openModal(ev) {
    let button = ev.target;
    let itineraryId = this.state.item._id;
    let userId = this.state.token;
    this.setState({
      visible: true
    });

    fetch("/api/favourites/" + userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: "favourites=" + itineraryId
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            isLoading: false,
            favsLoaded: true
          });
          button.classList.add("favourite_added");
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  handleClick(ev) {
    let el = ev.target.parentNode.parentNode;
    let button = ev.target;
    let buttonparent = ev.target.parentNode;
    let activities = ev.target.parentNode.previousSibling;

    if (el.classList.contains("expand")) {
      el.classList.remove("expand");
      buttonparent.classList.remove("expand");
      button.classList.remove("active");
      activities.classList.remove("activities_show");
    } else {
      el.classList.add("expand");
      buttonparent.classList.add("expand");
      button.classList.add("active");
      activities.classList.add("activities_show");
    }
    el.scrollIntoView(true);
    this.setState({
      showActivities: !this.state.showActivities
    });
  }

  isLoading() {
    if (!this.state.isLoading && this.state.token == null) return false;
    if (this.state.isLoading || this.props.userIsLoading) return true;
    return false;
  }

  render() {
    let item = this.props.item;
    let index = this.props.index;
    if (this.isLoading()) {
      return <div>Loading...</div>;
    }
    return (
      <div className="itinerary_card" key={index}>
        <div className="itinerary_card_divider">
          <div className="itinerary_card_user_container">
            <img src={item.profilePic} alt={item.user} />
            <span className="itinerary_card_user">{item.user}</span>
          </div>
          <div className="itinerary_card_info_container">
            <div className="itinerary_card_title_wrapper">
              <span className="itinerary_card_title">{item.title}</span>
              {this.state.token != null && (
                <button
                  className={"favourites_button " + (this.props.user.favourites.includes(item._id) ? "favourite_added" : "")}
                  type="button"
                  value="Open"
                  onClick={(this.props.user.favourites.includes(item._id) || this.state.favsLoaded ? this.openDeleteModal : this.openModal)}
                >
                  <i className="fas fa-heart" />
                </button>
              )}
            </div>
            <div className="itinerary_card_info">
              <div>Likes: {item.likes}</div>
              <div>{item.duration} hours</div>
              <div>{item.price}</div>
            </div>
            <div className="itinerary_card_info">{item.hashtag.join(" ")} </div>
          </div>
        </div>

        <div className="activities_hide">
          {this.state.showActivities && (
            <Activities
              itineraryId={item._id}
              itineraryName={item.title.replace(/\s/g, "").toLowerCase()}
            />
          )}
        </div>
        <div className="itinerary_card_bottom">
          <div
            className={this.state.active ? "toggle active" : "toggle"}
            onClick={this.handleClick}
          />
        </div>

        <Modal
          visible={this.state.visible}
          width="95%"
          height="200"
          effect="fadeInDown"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <a
              href="javascript:void(0);"
              className="modal_closebtn"
              onClick={() => this.closeModal()}
            >
              &times;
            </a>
            <span className="modal_text">MYtinerary added to favourites!</span>
            <Link to="/favourites" className="modal_link">
              Go to favourites page
            </Link>
          </div>
        </Modal>

        <Modal
          visible={this.state.visibleDelete}
          width="95%"
          height="200"
          effect="fadeInDown"
          onClickAway={() => this.closeDeleteModal()}
        >
          <div>
            <span className="delete_text">Are you sure you want to delete this MYtinerary from your favourites?</span>
            <div className="delete_button_wrapper">
            <div className="delete_button" onClick={() => this.deleteFavourite()}>Yes</div>
            <div className="delete_button no" onClick={() => this.closeDeleteModal()}>No</div>
            </div>
          </div>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    userIsLoading: state.userIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: id => dispatch(actionCreator.fetchUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Itinerary);
