import React from 'react';
import { getData } from '../request/api.js';

export type TableData = {
  currentBalance: string
  grade: string
  homeOwnership: string
  id: number
  quarter: string
  term: string
  year: string
}

export type TableCtx = {
  state: State<TableData[]>
}

export type GradeMap = { [grade: number]: number[] } // Map grades to record IDs

type State<T> = {
  data: T | null
  error: string | null
  grades: GradeMap
  loading: boolean
}

type Action =
  { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS', payload: TableData[] }
  | { type: 'FETCH_ERROR' };

/**
 * @method mapGrades
 * Sort records by grade.
 **/
const mapGrades = (data: TableData[]): GradeMap => {
  const grades = {};
  for (const record of data) {
      const { grade, id } = record;
      const prev = grades[grade] ?? [];
      grades[grade] = [...prev, id];
  }
  return grades;
}

const tableReducer = (state: State<TableData[]>, action: Action): State<TableData[]> => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        grades: mapGrades(action.payload) // Do this once when the data is received.
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: "Could not load data." };
    default:
      throw new Error("Invalid action type.");
  }
}

/**
 * @method useTableData
 * Handles state management for the table data. In a larger application we'd
 * want to use a state management library like Redux for improved performance
 * and better dev tools.
 **/
export const useTableData = (): TableCtx => {

  const [state, dispatch] = React.useReducer(tableReducer, {
    data: null,
    error: null,
    grades: {},
    loading: false
  });

  React.useEffect(() => {
    let canceled = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const data: TableData[] = await getData()
        if (!canceled) {
          dispatch({
            type: "FETCH_SUCCESS",
            // Used flatMap to add IDs and eliminate invalid records.
            payload: data.flatMap((d,i) => (
              (d.grade === undefined) ? [] : [{...d, id: i}]
            ))
          });
        }
      } catch (e) {
        if (!canceled) {
          dispatch({ type: "FETCH_ERROR" });
        }
      }
    };
    fetchData();

    return () => {
      canceled = true;
    };
  }, []);

  return {
    state
  };
}

