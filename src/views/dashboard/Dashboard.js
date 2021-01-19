import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))
const Widgets = lazy(() => import('../widgets/Widgets'))
const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown'))
const Dashboard = () => {
  return (
    <>
    <WidgetsBrand withCharts/>
     <Widgets withCharts/>

     </>
  )
}

export default Dashboard
