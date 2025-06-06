import Papa from 'papaparse'
import rawData from './loansize.csv'

const parseData = (result, rawData) => {
  result.data.splice(0, 2)
  const { data } = result
  for (let i = 0; i < data.length; i += 1) {
    const year = data[i][0]
    const quarter = data[i][1]
    const grade = data[i][2]
    const homeOwnership = data[i][3]
    const term = data[i][4]
    const currentBalance = data[i][5]
    rawData.push({
      year,
      quarter,
      grade,
      homeOwnership,
      term,
      currentBalance,
    })
  }

  return rawData
}

const wait = (ms: number): Promise<void> => new Promise(res => {
  setTimeout(() => res(), ms);
});

export const getData = async () => {
  await wait(2000); // Simulate slow network request.
  const data = []
  Papa.parse(rawData, {
    complete: (result) => parseData(result, data),
  })
  return data
}
