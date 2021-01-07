import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
const Login = React.lazy(() => import('../views/pages/login/Login'));

const Page404 = React.lazy(() => import('../../src/views/pages/page404/Page404'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const login = localStorage.getItem("isLoggedIn");

  return (
    <main className="c-main">
      <CContainer fluid>
      {!login ?
          (
            <React.Suspense fallback={loading}>
                <Redirect to="/login"  /> 


            </React.Suspense>
 


          ) : (
            
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
          
            {/* <Redirect   to="/dashboard" />  */}
            <Redirect exact="true" from="/" to="/dashboard" />

          </Switch>
        </Suspense>
        )

}

      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
