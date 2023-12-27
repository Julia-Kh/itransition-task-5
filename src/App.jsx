import './App.css'
import { generateUsers, availableLocales } from './data'
import { ReactVirtualizedTable, columns } from './components/table'
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Export from './components/Export';
import Toolbar from './components/Toolbar';
import { useSettings } from './components/SettingsContext';

export default function App() {
  const settings = useSettings();
  const [users, setUsers] = useState(() => [])

  console.log(settings, users.length)

  const loadMore = useCallback(({ count = 10 }) => {
    return setTimeout(() => {
      setUsers((users) => [...users, ...generateUsers(count, users.length, settings)])
    }, 200)
  }, [setUsers, settings])

  useEffect(() => {
    setUsers(() => [])
    const timeout = loadMore({ count: 20 })
    return () => clearTimeout(timeout)
  }, [settings])

  return (
    <Box >
      <Toolbar availableLocales={availableLocales}>
        <Export data={users} headers={columns.map((column) => ({ "label": column.label, "key": column.dataKey }))} />
      </Toolbar>
      <ReactVirtualizedTable endReached={loadMore} data={users} />
    </Box >
  )
}