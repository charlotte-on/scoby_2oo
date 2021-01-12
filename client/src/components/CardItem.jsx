import React from "react";
import { withUser } from "../components/Auth/withUser";

const CardItem = (item) => {
  return (
    <div className="CardItem item">
      <img src={item.image} alt="item image" className="round-image" />
      <h4>{item.name}</h4>
      <p>
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
  );
};

export default withUser(CardItem);
