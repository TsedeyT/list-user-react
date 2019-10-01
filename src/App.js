import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      fromChild: "",
      isLoading: true,
      errors: null
    };
  }
  addUser = newUser => {
    const users = [...this.state.users];

    /*users.map(userEmail => {
      if (userEmail.email === newUser.email) {
        alert("The email is already in use, add another one");
      } else {
      }
    });*/
    //make request and push it to deleteRequests array
    users.push({
      name: `${newUser.firstName} ${newUser.lastName}`,
      email: newUser.email
    });
    this.setState({
      users
    });
    this.addDataUser(newUser);
  };

  addDataUser = data => {
    axios({
      method: "post",
      url: `https://cors-anywhere.herokuapp.com/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json`,
      data: {
        email: data.email,
        namefirst: data.firstName,
        namelast: data.lastName
      },
      auth: {
        password: "pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3",
        username: "90316-125"
      },
      header: {
        "content-Type": "Application/json"
      }
    });
  };

  addItem = data => {
    this.setState({
      lists: [...this.state.lists, this.state.fromChild],
      fromChild: data
    });
  };

  deleteItem = () => {
    const deleteRequests = [];

    this.state.users.map(user => {
      if (user.isSelected) {
        //make request and push it to deleteRequests array
        deleteRequests.push(this.deleteRequest(user.userid));
      }
    });

    Promise.all(deleteRequests).then(() => {
      // Update user state
      let updatedUsers = [...this.state.users];
      updatedUsers = updatedUsers.filter(user => {
        return !user.isSelected;
      });
      this.setState({ users: updatedUsers });
    });
  };

  deleteRequest = userid => {
    return axios.delete(
      decodeURI(
        `https://cors-anywhere.herokuapp.com/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users/${userid}.json`
      ),
      {
        auth: {
          username: "90316-125",
          password: "pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3"
        },
        headers: {
          "content-Type": "Application/json"
        }
      }
    );
  };

  selectUser(userId) {
    const users = [...this.state.users];
    users.map(user => {
      if (user.userid === userId) {
        user.isSelected = !user.isSelected;
      }
    });

    this.setState({ users });
  }

  componentDidMount() {
    axios(
      `https://cors-anywhere.herokuapp.com/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/users.json`,
      {
        auth: {
          username: "90316-125",
          password: "pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3"
        },
        headers: {
          "content-Type": "Application/json"
        }
      }
    )
      .then(response =>
        response.data.items.map(user => ({
          userid: `${user.userid}`,
          name: `${user.namefirst} ${user.namelast}`,
          email: `${user.email}`,
          datecreated: `${user.datecreated}`,
          datemodified: `${user.datemodified}`,
          isSelected: false
        }))
      )
      .then(users => {
        console.log(users);
        this.setState({
          users,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, users } = this.state;

    return (
      <div>
        <Header />

        <div>
          <ul className="flexed--row list--item grey--background list-heading">
            <li className="list--select"></li>
            <li> Name </li>
            <li> Email </li>
            <li> Date Created </li>
            <li> Date Modified </li>
          </ul>

          {!isLoading ? (
            users.map((user, index) => {
              return (
                <ul key={user.userid} className="flexed--row list--item">
                  <li className="list--select">
                    <input
                      type="checkbox"
                      checked={user.isSelected}
                      onChange={() => this.selectUser(user.userid)}
                    />{" "}
                  </li>
                  <li> {user.name} </li>
                  <li> {user.email} </li>

                  <li>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      year: "numeric"
                    }).format(user.datecreated)}
                  </li>
                  <li>
                    {new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      year: "numeric"
                    }).format(user.datemodified)}
                  </li>
                </ul>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <Footer
          deleteText="Delete"
          addText="Add User"
          deleteItem={this.deleteItem}
          addUser={this.addUser}
        />
      </div>
    );
  }
}
export default App;
