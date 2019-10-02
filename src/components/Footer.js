import React, { Component } from "react";
import Popup from "reactjs-popup";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(event) {
    event.preventDefault();
    this.props.addUser(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: ""
    });
  }

  closeSubmitModal() {
    this.setState({
      closeBtn: false
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="grey--background">
        <div>
          <span className="footer--flexed">
            <button className="btn--red" onClick={this.props.deleteItem}>
              {this.props.deleteText}
            </button>
            <Popup
              trigger={
                <button className="btn--blue">{this.props.addText}</button>
              }
              modal
            >
              {close => (
                <div className="modal">
                  <div className="close" onClick={close}>
                    &times;
                  </div>
                  <div className="header"> Add User </div>
                  <div className="content">
                    <form onSubmit={this.submitHandler}>
                      First name:
                      <br />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Frist Name"
                        value={this.state.firstName}
                        onChange={this.handleChange}
                      />
                      <br />
                      Last name:
                      <br />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                      />
                      <br />
                      Email:
                      <br />
                      <input
                        type="text"
                        name="email"
                        placeholder="Last Name"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <br />
                      <br />
                      <div className="actions">
                        <span>
                          <button
                            className="button btn--red"
                            onClick={() => {
                              close();
                            }}
                          >
                            Cancel
                          </button>

                          <button
                            className="button btn--blue"
                            onChange={this.handleChange}
                          >
                            Save
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Popup>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
