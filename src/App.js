import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({ currentUser: user });
      // createUserProfileDocument(user);
      // console.log(user);

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data())
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })

        
      }else {
        this.setState({currentUser: userAuth})
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop/hats" component={HatsPage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
