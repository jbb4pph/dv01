import React, { useState } from 'react';
import { TableDataContext } from '../App';
import { TableCtx, TableData } from '../hooks/useTableData';
import { LoanAnalysisChart } from './LoanAnalysisChart';

type Options = {
  homeOwnership: string[]
  quarter: string[]
  term: string[]
  year: string[]
}

type Filters = {
  homeOwnership: string
  quarter: string
  term: string
  year: string
}

export type GradeTotals = {
  [grade: number]: number
}

const initOptions: Options = {
  homeOwnership: [],
  quarter: [],
  term: [],
  year: []
}

const initFilters: Filters = {
  homeOwnership: "",
  quarter: "",
  term: "",
  year: ""
}

const filterKeys: (keyof Options)[] = [
  "homeOwnership",
  "quarter",
  "term",
  "year"
];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const spaced = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2');

/**
 * @method TableView
 * This particular view may have unique display/interactivity needs, so I'm
 * managing the state for the filters and their selected options here.
 **/
export const TableView = () => {

  const table: TableCtx = React.useContext(TableDataContext);
  const [opts, setOpts] = useState<Options>(initOptions);
  const [filters, setFilters] = useState<Filters>(initFilters);
  const [totals, setTotals] = useState<GradeTotals>({});

  const grades = Object.keys(table?.state?.grades ?? {});

  const applyFilters = (records: number[]) => {
    let next = [...records];
    const filterFns = filterKeys.flatMap(filterKey => {
      return (filters[filterKey] === "")
        ? []
        : [(id: number) => table.state.data[id][filterKey]===filters[filterKey]];
    });
    for (const filter of filterFns) {
      next = next.filter(filter);
    }
    return next;
  }

  const onChangeFilter = (key: keyof Filters) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setFilters(prev => ({...prev, [key]: e.target.value }));
  }

  /**
   * Reset all filters to the unselected state.
   **/
  const reset = (e: React.MouseEvent) => {
    e.preventDefault();
    setFilters(initFilters);
  }

  /**
   * Calculate the filter options when the data changes.
   *
   * For each record, iterate over each type of filter and add the record's
   * value to the list of options if it does not already exist.
   **/
  React.useEffect(() => {
    if (!table.state.data) return;
    const opts: Options = {...initOptions};
    for (const record of table.state.data) {
      for (const key of Object.keys(initOptions)) {
        if (!opts[key].includes(record[key])) {
          opts[key] = [...opts[key], record[key]];
        }
      }
    }
    for (const key of Object.keys(opts)) {
      opts[key] = opts[key].sort();
    }
    setOpts(opts);
  }, [table.state.data]);

  /**
   * Calculate the grade totals when the data or filters change.
   **/
  React.useEffect(() => {
    if (!table.state.data) return;
    const totals: GradeTotals = {};
    for (const [grade, records] of Object.entries(table.state.grades)) {
      const filtered = applyFilters(records);
      const total = filtered.reduce((sum, item) => {
      return sum + parseFloat(table.state.data[item].currentBalance);
    }, 0);
      totals[grade] = total;
    }
    setTotals(totals);
  }, [table.state.data, filters]);

  return (
    <div className="view">
      <p>{"dv01 Loan Analysis"}</p>
      <p>{"Jack Brown | jack@jackbrown.io"}</p>
      <div className="filters">
        {!!table.state.data && filterKeys.map(filterKey => (
          <div className="select">
          <label htmlFor={filterKey}>{spaced(capitalize(filterKey))}</label>
          <select
            className={filters[filterKey]==="" ? "unset" : ""}
            key={filterKey}
            name={filterKey}
            onChange={onChangeFilter(filterKey)}
            value={filters[filterKey]}
          >
            <option value={""}>{"Please select an option."}</option>
            {opts[filterKey].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          </div>
        ))}
        {!!table.state.data && (
          <button className="form reset" onClick={reset}>{"Reset"}</button>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            {grades.map(grade => (
              <td>{`Grade ${grade}`}</td>
            ))}
          </tr>
          <tr>
            {grades.map(grade => (
              <td>{`$${Number(totals[grade]?.toFixed(2)).toLocaleString('en-US') ?? " - "}`}</td>
            ))}
          </tr>
        </tbody>
      </table>
      {!!table.state.data && (
        <LoanAnalysisChart totals={totals} />
      )}
    </div>
  );
}

