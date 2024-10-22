import React from 'react'
import Krypt from './Krypt'
import ContextProvider from './context/Context'

      
function App() {
  return (
    <React.Fragment>
      <ContextProvider>
        <Krypt/>
      </ContextProvider>
    </React.Fragment>
  )
}

export default App