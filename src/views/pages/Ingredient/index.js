import React, { useEffect, useState, createRef, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CCollapse,
  CAlert,
  CLink,
  CFade,
} from "@coreui/react";

const IngredientList = React.lazy(() => import("../Ingredient/show"));
const IngredientCreat = React.lazy(() => import("../Ingredient/creat"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Ingredient = ({ match }) => {
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
                <IngredientList {...props} />
              </CFade>
            )}
          />
          <Route
            path={`${match.url}/creat`}
            render={(props) => (
              <CFade>
                <IngredientCreat {...props} />
              </CFade>
            )}
          />
          <Redirect to="/error" />
          {/* <Redirect exact from="/" to="/dashboard" /> */}
        </Switch>
      </Suspense>
    </>
  );
};

export default Ingredient;
