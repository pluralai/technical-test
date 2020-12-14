import React from 'react'
import useFile from './data/useFile'

const App = () => {
  const { data, loading } = useFile('test.xlsx')

  if (loading) {
    return (
      <div className="loading">
        Loading please wait...
      </div>
    )
  }

  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

export default App
