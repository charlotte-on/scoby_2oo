import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignup extends Component {
  state = {};

  imageRef = React.createRef();

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;

    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { authContext } = this.props;

    apiHandler
      .signup(this.state)
      .then((data) => {
        authContext.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });

    // const fd = new FormData();

    // for (let key in this.state.user) {
    //   fd.append(key, this.state[key]);
    // }

    // fd.append("profileImage", this.imageRef.current.files[0]);
    // this.context.signup(fd);
  };

  render() {
    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Hello
            <span role="img" aria-label="hand">
              👋
            </span>
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Create account</h2>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="city">
              City
            </label>
            <input className="input" id="city" type="text" name="city" />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="secondaryEmail">
              Secondary email
            </label>
            <input
              className="input"
              id="secondaryEmaill"
              type="email"
              name="secondaryEmail"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="profileImg">
              Profile picture
            </label>
            <input
              ref={this.imageRef}
              className="input"
              name="profileImg"
              id="profileImg"
              type="file"
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section-bottom">
          <p>Already have an account? </p>
          <Link className="link" to="/signin">
            Log in
          </Link>
        </div>
      </section>
    );
  }
}

export default withRouter(withUser(FormSignup));
