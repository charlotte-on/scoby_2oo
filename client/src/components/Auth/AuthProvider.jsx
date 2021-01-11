import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";

export const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({ user: data, isLoggedIn: true, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ user: null, isLoggedIn: false, isLoading: false });
      });
  }

  signup = (data) => {
    console.log("Here");

    apiHandler
      .signup(data)
      .then(() => {
        this.props.history.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signin = async (data) => {
    try {
      const user = await apiHandler.signin(data);
      this.setState({ user: user, isLoggedIn: true });
      this.props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  setUser = (user) => {
    this.setState({ user, isLoggedIn: true });
  };

  removeUser = () => {
    this.setState({ user: null, isLoggedIn: false });
  };

  render() {
    //  Setup all the values/functions you want to expose to anybody reading
    // from the AuthContext.
    const authValues = {
      user: this.state.user,
      setUser: this.setUser,
      removeUser: this.removeUser,
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
    };
    return (
      <AuthContext.Provider value={authValues}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default withRouter(AuthProvider);
