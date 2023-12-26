import './App.css'
import { generateUsers } from './data'
import { useState, useCallback, useEffect } from 'react'
import { ReactVirtualizedTable } from './table'

export default function App() {
  const [users, setUsers] = useState(() => [])

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(100, users.length)])
    }, 200)
  }, [setUsers])

  useEffect(() => {
    const timeout = loadMore()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div>
      {/* <h3>Test</h3> */}
      <ReactVirtualizedTable endReached={loadMore} data={users} />
      {/* <Virtuoso
        style={{ height: 300, width: 500 }}
        data={users}
        endReached={loadMore}
        overscan={200}
        itemContent={(index, user) => {
          return <div style={{ backgroundColor: user.bgColor }}>{user.name}</div>
        }}
        components={{ Footer }}
      /> */}
    </div>
  )
}


const Footer = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      Loading...
    </div>
  )
}
