import React, { Component } from "react";
import "./App.css";
import { PaymentPage } from "./payment";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <div className="container">
              <Switch>
                <Route exact path="/" component={PaymentPage} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
