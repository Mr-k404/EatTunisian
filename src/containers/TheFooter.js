import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://github.com/Mr-k404" target="_blank" rel="noopener noreferrer">Eat Tunisian </a>
        <span className="ml-1">&copy; 2020 Mr.k.</span>
      </div>
      
    </CFooter>
  )
}

export default React.memo(TheFooter)
