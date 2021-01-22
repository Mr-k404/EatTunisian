import React from "react";
import { CCardGroup, CWidgetProgressIcon, CProgress } from "@coreui/react";

import CIcon from "@coreui/icons-react";

const Widgets = () => {
  return (
    <>
      <br />
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header="87.500"
          text="Clients"
          color="gradient-info"
        >
          <CIcon name="cil-people" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
        >
          <CIcon name="cil-userFollow" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1238"
          text="Recipes"
          color="gradient-warning"
        >
          <CIcon name="cil-Dinner" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon header="28%" text="Total Ingredient">
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="123k"
          text="Downloads"
          color="gradient-danger"
          progressSlot={
            <CProgress
              color="danger"
              size="xs"
              value={75}
              animated
              className="my-3"
            />
          }
        >
          <CIcon name="cil-cloud-download" height="36" />
        </CWidgetProgressIcon>
      </CCardGroup>
      {/* <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header="87.500"
          text="Visitors"
          color="gradient-info"
          inverse
        >
          <CIcon name="cil-people" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
          inverse
        >
          <CIcon name="cil-userFollow" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1238"
          text="Products sold"
          color="gradient-warning"
          inverse
        >
          <CIcon name="cil-basket" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="28%"
          text="Returning Visitors"
          color="gradient-primary"
          inverse
        >
          <CIcon name="cil-chartPie" height="36"/>
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="5:34:11"
          text="Avg. Time"
          color="gradient-danger"
          inverse
        >
          <CIcon name="cil-speedometer" height="36"/>
        </CWidgetProgressIcon>
      </CCardGroup>
      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="87.500"
            text="Visitors"
            color="gradient-info"
          >
            <CIcon name="cil-people" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="385"
            text="New Clients"
            color="gradient-success"
          >
            <CIcon name="cil-userFollow" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
          >
            <CIcon name="cil-basket" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="28%"
            text="Returning Visitors"
            color="gradient-primary"
          >
            <CIcon name="cil-chartPie" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="5:34:11"
            text="Avg. Time"
            color="gradient-danger"
          >
            <CIcon name="cil-speedometer" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="972"
            text="comments"
            color="gradient-info"
          >
            <CIcon name="cil-speech" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
      </CRow> */}
      {/* <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="87.500"
            text="Visitors"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-people" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="385"
            text="New Clients"
            color="gradient-success"
            inverse
          >
            <CIcon name="cil-userFollow" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="1238"
            text="Products sold"
            color="gradient-warning"
            inverse
          >
            <CIcon name="cil-basket" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="28%"
            text="Returning Visitors"
            color="gradient-primary"
            inverse
          >
            <CIcon name="cil-chartPie" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="5:34:11"
            text="Avg. Time"
            color="gradient-danger"
            inverse
          >
            <CIcon name="cil-speedometer" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="972"
            text="comments"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-speech" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
      </CRow> */}
      {/* <CRow>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="danger"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="primary"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartLineSimple style={{ height: '40px' }} borderColor="success"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="danger"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="primary"/>
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="title" text="1,123">
            <ChartBarSimple style={{ height: '40px' }} backgroundColor="success"/>
          </CWidgetSimple>
        </CCol>
      </CRow> */}
    </>
  );
};

export default Widgets;
