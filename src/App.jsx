import './App.css'
import { generateUsers } from './data'
import { ReactVirtualizedTable, columns } from './components/table'
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Export from './components/Export';
import Toolbar from './components/Toolbar';

import { SettingsProvider } from './components/SettingsContext';


export default function App() {
  const [users, setUsers] = useState(() => [])

  const loadMore = useCallback(() => {
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(10, users.length)])
    }, 100)
  }, [setUsers])

  useEffect(() => {
    const timeout = loadMore()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <SettingsProvider>
      <Box >
        <Toolbar>
          <Export data={users} headers={columns.map((column) => ({ "label": column.label, "key": column.dataKey }))} />
        </Toolbar>

        <ReactVirtualizedTable endReached={loadMore} data={users} />
      </Box >
    </SettingsProvider >
  )
}