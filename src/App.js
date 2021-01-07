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
const login = localStorage.getItem("isLoggedIn");

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    login === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
) 

class App extends Component {
  state = {
     navigate: false,
     
   };

  // onLogoutHandler = () => {
  //   localStorage.clear();
  //   this.setState({
  //     navigate: true,
  //   });
  // };


  render() {

  return  (
              
           <Router>
<React.Suspense fallback={loading}>
<Switch>
<Route exact="true" path="/dashboard" name="Home" component={props => <TheLayout {...props} />} />
 <Route exact="true" path="/" name="Home" component={props => <TheLayout {...props} />} />
<Route  path="/login" name="Login Page" component={props => <Login {...props} />} />     

</Switch>
 </React.Suspense>)
{login ?(
              
              <Redirect  to="/" /> 

)
            :
            (
              
              <Redirect from="dashboard" to="/login" /> 


            )}


          





{/* 
        {login ?
          (
            <React.Suspense fallback={loading}>
              <Switch>
                <Route path="/" name="Home" component={props => <TheLayout {...props} />} />
                <Route path="*" component={props => <Page404 {...props}/>}/>
              </Switch>
            </React.Suspense>
 


          ) : (
            <React.Suspense fallback={loading}>
                <Redirect to="/login" push={true} />
                <Route exact path="/login" name="Login Page" component={props => <Login {...props} />} />
            </React.Suspense>
          )

        } */}
        </Router>

   );
  }
}

export default App;




