import React, { useEffect, useState, createRef } from 'react'
import classNames from 'classnames'
import {
  CRow,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
} from '@coreui/react'
import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','name','instractions', 'category', 'cookTime','servings','rate','image']

const Recipes = () => {
  return (
    <>
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            Recipes List 
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'servings':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.servings)}>
                        {item.servings}
                      </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      
    </>
  )
}

export default Recipes
