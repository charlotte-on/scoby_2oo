import React, { Component } from "react";
import LocationAutoComplete from "../LocationAutoComplete";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class ItemForm extends Component {
  state = {
    user: this.props.authContext.user,
    isLoggedIn: this.props.authContext.isLoggedIn,
  };

  imageRef = React.createRef();

  // static contextType = AuthContext;

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    console.log(this.state);

    this.setState({
      [key]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    function buildFormData(formData, data, parentKey) {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        Object.keys(data).forEach((key) => {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        });
      } else {
        const value = data == null ? "" : data;

        formData.append(parentKey, value);
      }
    }

    function jsonToFormData(data) {
      const fd = new FormData();

      buildFormData(fd, data);

      return fd;
    }

    const datas = {
      name: this.state.name,
      property: this.state.property,
      quantity: this.state.quantity,
      address: this.state.address,
      location: this.state.location,
      formattedAddress: this.state.formattedAddress,
      description: this.state.description,
      image: this.state.image,
      id_user: this.props.authContext.user._id,
    };

    let fd = jsonToFormData(datas);

    apiHandler
      .createItem(fd)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleImage = (event) => {
    const key = event.target.name;
    const value = this.imageRef.current.files[0];

    this.setState({
      [key]: value,
    });
  };

  handlePlace = (place) => {
    this.setState({
      address: place.place_name,
      location: {
        type: place.geometry.type,
        coordinates: place.geometry.coordinates,
      },
      formattedAddress: place.place_name,
    });
  };

  render() {
    return (
      <div className="ItemForm-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Add Item</h2>

          <div className="form-group">
            <label className="label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="input"
              type="text"
              name="name"
              onChange={this.handleChange}
              placeholder="What are you giving away ?"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>

            <select
              id="category"
              defaultValue="-1"
              name="property"
              onChange={this.handleChange}
            >
              <option value="-1" disabled>
                Select a category
              </option>
              <option value="Plant">Plant</option>
              <option value="Kombucha">Kombucha</option>
              <option value="Vinegar">Vinegar</option>
              <option value="Kefir">Kefir</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="input"
              id="quantity"
              type="number"
              name="quantity"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="location">
              Address
            </label>
            <LocationAutoComplete onSelect={this.handlePlace} />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              className="text-area"
              placeholder="Tell us something about this item"
              name="description"
              onChange={this.handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label className="custom-upload label" htmlFor="image">
              Upload image
            </label>
            <input
              className="input"
              id="image"
              type="file"
              name="image"
              ref={this.imageRef}
              onChange={this.handleImage}
            />
          </div>

          <h2>Contact information</h2>

          <div className="form-group">
            <label className="label" htmlFor="contact">
              How do you want to be reached?
            </label>
            <div>
              <input type="radio" name="email" />
              user email
            </div>
            <input type="radio" name="phoneNumber" />
            contact phone number
          </div>

          <p className="message">
            <img src="/media/info.svg" alt="info" />
            Want to be contacted by phone? Add your phone number in your
            personal page.
          </p>

          <button className="btn-submit">Add Item</button>
        </form>
      </div>
    );
  }
}

export default withUser(ItemForm);
