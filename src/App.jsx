import React from 'react'
import Krypt from './Krypt'
import ContextProvider from './context/Context'
import SolanaProvider from '@w3b/SolanaProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <React.Fragment>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <SolanaProvider>
            <Krypt/>
          </SolanaProvider>
          </QueryClientProvider>
      </ContextProvider>
    </React.Fragment>
  )
}

export default App