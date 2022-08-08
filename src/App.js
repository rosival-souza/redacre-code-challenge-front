import React, { useState, useEffect } from 'react'
import utils from './utils'
import ReactPaginate from 'react-paginate'


export default function App() {

  const [currencyFrom, setCurrencyFrom] = useState('Bitcoin')
  const [amount, setAmout] = useState(1)
  const [currencyTo, setCurrencyTo] = useState('USD')
  const [type, setType] = useState('')
  const [value, setValue] = useState(48300)
  const [loader, setLoader] = useState(false)
  const itemsPerPage = 4
  const [dates, setDates] = useState({
    dateIni: utils.getDateBefore(10),
    dateEnd: utils.getDate()
  })

  const dataSelect = [
    {
      value: 1,
      text: 'Bitcoin',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-bitcoin text-orange-600" viewBox="0 0 16 16">
        <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
      </svg>
    },
    {
      value: 2,
      text: 'Ethereum',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-bitcoin text-orange-600" viewBox="0 0 16 16">
        <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
      </svg>,
    },
    {
      value: 3,
      text: 'Ripple',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-bitcoin text-orange-600" viewBox="0 0 16 16">
        <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
      </svg>,
    },
    {
      value: 4,
      text: 'Litcoin',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-bitcoin text-orange-600" viewBox="0 0 16 16">
        <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z" />
      </svg>
    }
  ]
  const [data] = useState([
    { dateTime: '2022-08-08', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-05', currencyFrom: 'Ripple', amount: 1, currencyTo: 'EUR', value: 56000, type: 'Exchanged' },
    { dateTime: '2022-08-04', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 38000, type: 'Live Price' },
    { dateTime: '2022-08-01', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 58000, type: 'Exchanged' },
    { dateTime: '2022-08-04', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 18000, type: 'Live Price' },
    { dateTime: '2022-08-02', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-04', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Exchanged' },
    { dateTime: '2022-08-10', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-03', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-11', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Exchanged' },
    { dateTime: '2022-08-12', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-01', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Exchanged' },
    { dateTime: '2022-08-02', currencyFrom: 'Ripple', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-01', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 48000, type: 'Exchanged' },
  ])
  const [dataGrid, setDataGrid] = useState(data)
  const getFilter = () => {

    let dateIni = new Date(dates.dateIni).getTime()
    let dateEnd = new Date(dates.dateEnd).getTime()

    const filter = data.filter((element) => {
      if (
        new Date(element.dateTime).getTime() >= dateIni && new Date(element.dateTime).getTime() <= dateEnd
        && element.type.includes(type)
      ) {
        return element
      }
    })
    console.log('filter ->', filter)
    setDataGrid(filter)

  }
  const sendData = async () => {

    setLoader(true)

    setTimeout(() => {

      setLoader(false)

    }, 5000)


  }

  useEffect(() => {

    console.log('currencyFrom ->', currencyFrom)

  }, [currencyFrom])


  /*********/
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  // Here we use item offsets we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    setCurrentItems(dataGrid.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(dataGrid.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, dataGrid])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataGrid.length
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    setItemOffset(newOffset)
  }
  /*********/


  return (
    <div className="App">
      <header className="container mx-auto  shadow-lg border-none p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Exchange
        </p>
        <div className="flex flex-wrap">

          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Currency From</label>
            <select value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)} className="block appearance-none w-full border-gray-200 text-gray-700 p-.1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>Bitcoin</option>
              <option>Ripple</option>
            </select>
          </div>

          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmout(e.target.value)}
              type="number"
              className="
                form-control
                block
                w-full
                px-3
                p-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
            />
          </div>
          <div className="flex space-x-2 justify-center items-center border w-1/1 p-5">
            <br />=
          </div>
          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Currency to</label>
            <select value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)} className="block appearance-none w-full border-gray-200 text-gray-700 p-.1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Amount</label>
            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              className="
                form-control
                block
                w-full
                px-3
                p-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
            />
          </div>
          <div className="border w-52 p-5">
            <button
              onClick={() => sendData()}
              disabled={loader}
              type="button" className="mt-7 w-24 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              {loader ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </header>

      <footer className="container mx-auto shadow-lg border-none p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          History
        </p>
        <div className="flex flex-wrap">
          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">From date</label>
            <input
              onChange={(e) => setDates({ ...dates, dateIni: e.target.value })}
              value={dates.dateIni}
              type="date"
              className="form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Select a date" />
          </div>
          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">To date</label>
            <input
              onChange={(e) => setDates({ ...dates, dateEnd: e.target.value })}
              value={dates.dateEnd} type="date"
              className="form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Select a date" />

          </div>
          <div className="border w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="">All</option>
              <option>Live Price</option>
              <option>Exchanged</option>
            </select>
          </div>
          <div className="border w-52 p-5">
            <button
              onClick={() => getFilter()}
              type="button" className="mt-8 w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
              filter
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          <table className="border-collapse border w-full">
            <thead className="text-left">
              <tr>
                <th className="p-1 font-normal bg-gray-100 border border-slate-300 ">Date & Time</th>
                <th className="p-1 font-normal bg-gray-100 border border-slate-300 ">Currency From</th>
                <th className="p-1 font-normal bg-gray-100 border border-slate-300 ">Amount 1</th>
                <th className="p-1 font-normal bg-gray-100 border border-slate-300 ">Currency To</th>
                <th className="p-1 font-normal bg-gray-100 border border-slate-300 ">Amount 2</th>
                <th className="p-1 font-normal bg-gray-100 border border-slate-300 ">Type</th>
              </tr>
            </thead>
            <tbody className="text-left striped">
              {currentItems &&
                currentItems.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3 border border-slate-300 ...">{utils.formatDate(row.dateTime)}</td>
                    <td className="p-3 border border-slate-300 ...">{row.currencyFrom}</td>
                    <td className="p-3 border border-slate-300 ...">{row.amount}</td>
                    <td className="p-3 border border-slate-300 ...">{row.currencyTo}</td>
                    <td className="p-3 border border-slate-300 ...">{utils.formatMoney(row.value)}</td>
                    <td className={row.type === 'Exchanged' ? "p-3 border border-slate-300 text-blue-600" : "p-3 border border-slate-300 text-green-500"}>{row.type}</td>
                  </tr>
                ))}
              <tr >
                <td>
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next ->"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<- Previous"
                    renderOnZeroPageCount={null}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  )
}

