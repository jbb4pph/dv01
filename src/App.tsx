import React, { Component } from 'react'
import './App.css'
import { TableView } from './components'
import { useTableData } from './hooks/useTableData';

type ViewProps = { children?: React.ReactNode | React.ReactNode[] }
export const TableDataContext = React.createContext(null);

function App() {

  const table = useTableData();

  return (
    <TableDataContext.Provider value={table}>
      <div className="App">
        <Views />
      </div>
    </TableDataContext.Provider>
  )
}


/**
 * If we had more than one route, we could configure them here.
 **/
function Views(props: ViewProps) {

  return (
    <>
      {props.children}
      <TableView />
    </>
  );
}

export default App
