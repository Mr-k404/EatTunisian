import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));

class App extends Component {
  state = {
    navigate: false,
    i: 0,
  };

  render() {
    const login = localStorage.getItem("isLoggedIn");

    return (
      <>
        <Router>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                path="/login"
                name="Login Page"
                component={(props) => <Login {...props} />}
              />
              <Route
                path="/error"
                name="404"
                component={(props) => <Page404 {...props} />}
              />
              <Route
                path="/"
                name="Home"
                component={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
          {!login ? (
            <>
              <Route
                path="error"
                name="404"
                component={(props) => <Page404 {...props} />}
              />
              <Redirect from="dashboard" to="/login" />
            </>
          ) : null}
        </Router>
      </>
    );
  }
}

export default App;
