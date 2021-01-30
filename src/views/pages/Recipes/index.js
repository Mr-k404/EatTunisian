import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CFade } from "@coreui/react";

const RecipesList = React.lazy(() => import("../Recipes/show"));
const RecipesCreat = React.lazy(() => import("../Recipes/creat"));
const RecipesUpdate = React.lazy(() => import("../Recipes/update"));
const ShowDetails = React.lazy(() => import("../Recipes/showCared"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Recipes = ({ match }) => {
  return (
    <>
      <Suspense fallback={loading}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/show`} />
          <Route
            path={`${match.url}/show`}
            name="Show"
            render={(props) => (
              <CFade>
                <RecipesList {...props} />
                {console.log(props)}
              </CFade>
            )}
          />
          <Route
            path={`${match.url}/creat`}
            render={(props) => (
              <CFade>
                <RecipesCreat {...props} />
              </CFade>
            )}
          />

          <Route
            path={`${match.url}/update`}
            render={(props) => (
              <CFade>
                <RecipesUpdate {...props} />
              </CFade>
            )}
          />
          <Route
            path={`${match.url}/show-details`}
            render={(props) => (
              <CFade>
                <ShowDetails {...props} />
              </CFade>
            )}
          />
          <Redirect from="/recipes/" to="/recipes/show" />
          <Redirect to="/error" />

          {/* <Redirect exact from="/" to="/dashboard" /> */}
        </Switch>
      </Suspense>
    </>
  );
};

export default Recipes;
