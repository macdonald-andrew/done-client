import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import Loader from '../components/Loader'

import CoreLayout from './CoreLayout'
import ScrollToTop from '../components/ScrollToTop'
import ErrorBoundary from '../pages/ErrorBoundary'

const App = () => {
  return (
    <ScrollToTop>
      <ErrorBoundary>
        <Suspense fallback={<Loader active size='large' />}>
          <Route component={CoreLayout} />
        </Suspense>
      </ErrorBoundary>
    </ScrollToTop>
  )
}

export default App