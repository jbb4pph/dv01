import React, { Component } from 'react'
import { TableView } from './components'
import { useTableData } from './hooks/useTableData';

type ViewProps = { children?: React.ReactNode | React.ReactNode[] }
export const TableDataContext = React.createContext(null);

/**
 * If we had a Redux store, we'd set up the provider here. Instead, I've chosen
 * to use a reducer within a custom hook to manage the global state, and I've made
 * it available to the rest of the app via the React Context API.
 *
 * This approach is fine for a small app like this, but we'd run into performance
 * issues in a larger app. For example, if we had many consumers of this state, then
 * any state update would trigger widespread rerenders.
 **/
function App() {

  // Global state is managed within this hook.
  const table = useTableData();

  return (
    <TableDataContext.Provider value={table}>
      <div className="App">
        <Routes />
      </div>
    </TableDataContext.Provider>
  )
}


/**
 * If we had more than one route, we could configure them here (with React
 * Router, for example).
 **/
function Routes(props: ViewProps) {

  return (
    <>
      {props.children}
      <TableView />
    </>
  );
}

export default App
