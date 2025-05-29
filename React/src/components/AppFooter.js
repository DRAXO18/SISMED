import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; 2025 Todos los derechos reservados.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Realizado por</span>
        <a href="https://devilopers.org.pe" target="_blank" rel="noopener noreferrer">
          {'<Devilopers>'} Software Studio
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
