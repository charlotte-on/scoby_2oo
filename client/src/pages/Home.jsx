import React from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "./../api/apiHandler";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/CardItem.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Home extends React.Component {
  state = {
    user: this.props.authContext.user,
    isLoggedIn: this.props.authContext.isLoggedIn,
    items: [],
    active: false,
  };

  componentDidMount = () => {
    apiHandler.getItems().then((datas) => {
      console.log(datas);
      this.setState({
        items: datas,
      });
    });
  };

  toggleClass = (event) => {
    const currentState = this.state.active;
    console.log(event.target);
    this.setState({ active: !currentState });
  };

  render() {
    return (
      <div>
        <h1>MAPBOX MAP HERE</h1>
        <p>On home /</p>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={[2.3473629999999996, 48.857607]}
          containerStyle={{
            height: "100vh",
            width: "100vw",
          }}
        >
          {this.state.items.map((item) => {
            return (
              <div>
                <Marker
                  coordinates={[
                    item.location.coordinates[0],
                    item.location.coordinates[1],
                  ]}
                  anchor="bottom"
                  key={item._id}
                  onClick={this.toggleClass}
                >
                  <img src="media/marker.svg" alt="marker" />
                </Marker>

                <Popup
                  coordinates={[
                    item.location.coordinates[0],
                    item.location.coordinates[1],
                  ]}
                  className={this.state.active ? "dis" : null}
                  offset={{
                    "bottom-left": [12, -38],
                    bottom: [0, -38],
                    "bottom-right": [-12, -38],
                  }}
                >
                  <div className="CardItem item">
                    <img
                      src={item.image}
                      alt="item image"
                      className="round-image"
                    />
                    <h4>{item.name}</h4>
                    <p className="description">
                      Quantity: {item.quantity} | {item.category}
                    </p>
                    <div>{item.description}</div>
                    <p>{item.address}</p>
                    {/* <img
                      src={this.props.authContext.user.profileImg}
                      alt="user's image"
                    />{" "}
                  <p> Given away by {this.props.authContext.user.firstName}</p> */}
                  </div>
                </Popup>
              </div>
            );
          })}
        </Map>
      </div>
    );
  }
}

export default withUser(Home);
