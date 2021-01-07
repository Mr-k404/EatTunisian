import React, { Component, lazy } from 'react'
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

class Dashboard extends Component {

  constructor() {
    super()
  }
  render() {
    return (

      <WidgetsBrand withCharts />
    )
  }
}
export default Dashboard
