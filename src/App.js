import React, { useState, useEffect } from 'react'
import utils from './utils'
import ReactPaginate from 'react-paginate'

export default function App() {

  const [currencyFrom, setCurrencyFrom] = useState('Bitcoin')
  const [amount, setAmout] = useState(1)
  const [currencyTo, setCurrencyTo] = useState('USD')
  const dataCurrencyTo = [
    { id: 1, text: 'USD', icon: '🇺🇸',value: 44000 },
    { id: 2, text: 'EUR', icon: '🗺',value: 45000 },
  ]
  const [type, setType] = useState('All')
  const [value, setValue] = useState(dataCurrencyTo[0].value)
  const [loader, setLoader] = useState({
    get: false,
    send: false
  })
  const itemsPerPage = 4
  const API = 'http://localhost:4000'
  const [dates, setDates] = useState({
    dateIni: utils.getDateBefore(10),
    dateEnd: utils.getDate()
  })

  /** This is data temp to demonstrate Grid **/ 
  const dataTemp = [
    { date: '2022-08-08', currency_from: 'Bitcoin', amount: 1, currency_to: 'USD', total: 48000, type: 'Live Price' },
    { date: '2022-08-05', currency_from: 'Ripple', amount: 1, currency_to: 'EUR', total: 56000, type: 'Exchanged' },
    { date: '2022-08-04', currency_from: 'Bitcoin', amount: 1, currency_to: 'USD', total: 38000, type: 'Live Price' },
    { date: '2022-08-01', currency_from: 'Bitcoin', amount: 1, currency_to: 'EUR', total: 58000, type: 'Exchanged' },
    { date: '2022-08-04', currency_from: 'Bitcoin', amount: 1, currency_to: 'USD', total: 18000, type: 'Live Price' },
    { date: '2022-08-02', currency_from: 'Ripple', amount: 1, currency_to: 'USD', total: 48000, type: 'Live Price' },
    { date: '2022-08-04', currency_from: 'Bitcoin', amount: 1, currency_to: 'EUR', total: 48000, type: 'Exchanged' },
    { date: '2022-08-10', currency_from: 'Ripple', amount: 1, currency_to: 'USD', total: 48000, type: 'Live Price' },
    { date: '2022-08-03', currency_from: 'Bitcoin', amount: 1, currency_to: 'EUR', total: 48000, type: 'Live Price' },
    { date: '2022-08-11', currency_from: 'Ripple', amount: 1, currency_to: 'USD', total: 48000, type: 'Exchanged' },
    { date: '2022-08-12', currency_from: 'Bitcoin', amount: 1, currency_to: 'EUR', total: 48000, type: 'Live Price' },
    { date: '2022-08-01', currency_from: 'Ripple', amount: 1, currency_to: 'USD', total: 48000, type: 'Exchanged' },
    { date: '2022-08-02', currency_from: 'Ripple', amount: 1, currency_to: 'EUR', total: 48000, type: 'Live Price' },
    { date: '2022-08-01', currency_from: 'Bitcoin', amount: 1, currency_to: 'USD', total: 48000, type: 'Exchanged' },
  ]
  /** This is data temp to demonstrate Grid **/ 

  const [dataGrid, setDataGrid] = useState(dataTemp)

  /* Exemple local filter*/ 
  /* eslint-disable */
  const getFilter = () => {

    let dateIni = new Date(dates.dateIni).getTime()
    let dateEnd = new Date(dates.dateEnd).getTime()
    let dataFilter = dataGrid

    console.log('dataFilter ->', dataFilter)
    const filter = dataFilter.filter((element) => {
      if (
        new Date(element.date).getTime() >= dateIni && new Date(element.date).getTime() <= dateEnd
        // && element.type.includes(type)
      ) {
        return element
      }

    })
    console.log('filter ->', filter)
    setDataGrid(filter)

  }
  /* eslint-enable */
  /* Exemple local filter*/ 

  const getData = async () => {

    setLoader({ ...loader, get: true })

    try {

      const response = await fetch(`${API}/history/${dates.dateIni}/${dates.dateEnd}/${type}`, {
        method: 'GET',
        timeout: 15000,
        headers: { 'Content-Type': 'application/json' },
      })

      const res = await response.json()

      console.log('res ->', res)

      setDataGrid(res.data)

    } catch (error) {

      console.log('#### error #####', error)
    }

    setLoader({ ...loader, get: false })

  }
  const sendData = async () => {

    setLoader({ ...loader, send: true })

    let total = (amount * value)

    try {

      const response = await fetch(`${API}/history`, {
        method: 'POST',
        timeout: 15000,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currencyFrom: currencyFrom,
          amount: amount,
          currencyTo: currencyTo,
          total: total
        })
      })

      const data = await response.json()

      console.log('res ->', data)
      getData()

    } catch (error) {

      console.log('#### error #####', error)
    }

    setLoader({ ...loader, send: false })

  }
  const getValue = (dataSelect) =>{

    dataSelect = Number(dataSelect)

    const filter = dataCurrencyTo.filter(element =>{
      return element.id === dataSelect
    })

    setCurrencyTo(filter[0].text)
    setValue(filter[0].value)
    sumValues(amount)

  }
  const sumValues = (amountInput) => {

    amountInput = parseInt(amountInput)

    setAmout(amountInput)

    let total = amountInput * value

    document.getElementById("value").value = `$ ${utils.formatMoney(total)}`

  }

  useEffect(() => {

    sumValues(amount)

  }, [value])

  useEffect(() => {

    getData()
    sumValues(amount)

  }, [])


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
      <header className="container mx-auto shadow-lg border-none p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Exchange
        </p>
        <div className="flex flex-wrap">

          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Currency From</label>
            <select
              value={currencyFrom}
              onChange={(e) => setCurrencyFrom(e.target.value)}
              className="block appearance-none w-full border-gray-200 text-gray-700 p-.1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value=" "> 👊🏻 Select</option>
              <option value="Bitcoin">₿ Bitcoin</option>
              <option value="Ripple">Ripple</option>
            </select>
          </div>

          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Amount</label>
            <input
              value={amount}
              onChange={(e) => sumValues(e.target.value > 0 ? e.target.value : 1)}
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
                focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none
              "
            />
          </div>
          <div className="flex space-x-2 justify-center items-center w-1/1 p-5">
            <br />=
          </div>
          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Currency to</label>
            <select
              onChange={(e) => getValue(e.target.value)}
              className="block appearance-none w-full border-gray-200 text-gray-700 p-.1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              {
                dataCurrencyTo.map((row, idx) =>
                  <option key={idx} value={row.id}>{row.icon} {row.text}</option>
                )
              }
            </select>
          </div>
          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Amount</label>
            <input
              id="value"
              disabled={true}
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
          <div className="w-52 p-5">
            <button
              onClick={() => sendData()}
              disabled={loader.send}
              type="button" className="mt-7 w-24 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              {loader.send ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </header>
      <footer className="container mx-auto shadow-lg border-none p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          History
        </p>
        <div className="flex flex-wrap">
          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">From date</label>
            <input
              onChange={(e) => setDates({ ...dates, dateIni: e.target.value })}
              value={dates.dateIni}
              type="date"
              className="form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Select a date" />
          </div>
          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">To date</label>
            <input
              onChange={(e) => setDates({ ...dates, dateEnd: e.target.value })}
              value={dates.dateEnd} type="date"
              className="form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Select a date" />

          </div>
          <div className="w-52 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option value="All">All</option>
              <option value="EUR">Live Price</option>
              <option value="USD">Exchanged</option>
            </select>
          </div>
          <div className="w-52 p-5">
            <button
              onClick={() => getData()}
              type="button" className="mt-8 w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
              filter
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          <table className="border-collapse w-full">
            <thead className="text-left">
              <tr>
                <th className="p-1 font-normal bg-gray-100">Date & Time</th>
                <th className="p-1 font-normal bg-gray-100">Currency From</th>
                <th className="p-1 font-normal bg-gray-100">Amount 1</th>
                <th className="p-1 font-normal bg-gray-100">Currency To</th>
                <th className="p-1 font-normal bg-gray-100">Amount 2</th>
                <th className="p-1 font-normal bg-gray-100">Type</th>
              </tr>
            </thead>
            <tbody className="text-left striped">
              {currentItems &&
                currentItems.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">{row.currency_from}</td>
                    <td className="p-3">{row.amount}</td>
                    <td className="p-3">{row.currency_to}</td>
                    <td className="p-3">{utils.formatMoney(row.total)}</td>
                    <td className={row.currency_to === 'USD' ? "p-3 text-blue-600" : "p-3 text-green-500"}>{row.currency_to === 'USD' ? 'Exchanged':'Live Price'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next ->"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<- Previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </footer>
    </div>
  )
}

