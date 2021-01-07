import React, { Component } from 'react';
import { BrowserRouter as Router , Route, Switch, Redirect  } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  state = {
     navigate: false,
     i:0
   };

  // onLogoutHandler = () => {
  //   localStorage.clear();
  //   this.setState({
  //     navigate: true,
  //   });
  // };


  render() {
    const login = localStorage.getItem("isLoggedIn");

  return  (
      <>
        {login ?
          (
             <Router>
            <React.Suspense fallback={loading}>
              <Switch>
              <Route exact path="/login" name="Login Page" component={props => <Login {...props} />} />
                <Route path="/" name="Home" component={props => <TheLayout {...props} />} />

              </Switch>
            </React.Suspense>
            </Router>
 
          ) : (
            <Router >
            <React.Suspense fallback={loading}>
                <Redirect to="/login" push={true} />
                <Route exact path="/login" name="Login Page" component={props => <Login {...props} />} />
            </React.Suspense>
            </Router>
          )

        }

</>    );
  }
}

export default App;




