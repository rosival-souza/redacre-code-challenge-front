import React, { useState, useEffect } from 'react'
import Select from 'react-select'

export default function App() {

  const [currencyFrom, setCurrencyFrom] = useState('Bitcoin')
  const [amount, setAmout] = useState(1)
  const [currencyTo, setCurrencyTo] = useState('USD')
  const [value, setValue] = useState(48300)
  const [loader, setLoader] = useState(false)
  const [dates, setDates] = useState({
    dateIni: getDate(),
    dateEnd: getDate()
  })

  const dataSelect = [
    {
      value: 1,
      text: 'Up Arrow',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
      </svg>
    },
    {
      value: 2,
      text: 'Down Arrow',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
      </svg>
    },
    {
      value: 3,
      text: 'Left Arrow',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
      </svg>
    },
    {
      value: 4,
      text: 'Right Arrow',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
      </svg>
    }
  ];
  const data = [
    { dateTime: '2022-08-09 01:32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 48000, type: 'Live Price' },
    { dateTime: '2022-08-05 10:32', currencyFrom: 'Ripple', amount: 1, currencyTo: 'EUR', value: 56000, type: 'Exchanged' },
    { dateTime: '2022-08-04 04:32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 38000, type: 'Live Price' },
    { dateTime: '2022-08-01 01:32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 58000, type: 'Exchanged' },
    // { dateTime: '2022-08-04 01:32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 18000, type: 'Live Price' },
    // { dateTime: '2022-08-02 01-32', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Live Price' },
    // { dateTime: '2022-08-04 01-32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Exchanged' },
    // { dateTime: '2022-08-10 01-32', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Live Price' },
    // { dateTime: '2022-08-03 01-32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Live Price' },
    // { dateTime: '2022-08-11 01-32', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Exchanged' },
    // { dateTime: '2022-08-12 01-32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Live Price' },
    // { dateTime: '2022-08-01 01-32', currencyFrom: 'Ripple', amount: 1, currencyTo: 'USD', value: 48000, type: 'Exchanged' },
    // { dateTime: '2022-08-02 01-32', currencyFrom: 'Ripple', amount: 1, currencyTo: 'EUR', value: 48000, type: 'Live Price' },
    // { dateTime: '2022-08-01 01-32', currencyFrom: 'Bitcoin', amount: 1, currencyTo: 'USD', value: 48000, type: 'Exchanged' },
  ]
  const [selectedOption, setSelectedOption] = useState(null);
 
  // handle onChange event of the dropdown
  const handleChange = e => {
    setSelectedOption(e);
  }
 
  function getDate() {

    var date = new Date()

    var today = {
      'year': date.getFullYear(),
      'month': (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
      'day': date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    }

    return today.year + '-' + today.month + '-' + today.day

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



  return (
    <div className="App">
      <header className="container mx-auto  shadow-lg border-none p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Exchange
        </p>
        <div className="flex flex-wrap">

          {/* <div className="border w-1/6 p-5">
            <Select
              placeholder="Select Option"
              // value={selectedOption}
              options={dataSelect}
              // onChange={handleChange}
              getOptionLabel={e => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {e.icon}
                  <span style={{ marginLeft: 5 }}>{e.text}</span>
                </div>
              )}
            />
          </div> */}

          <div className="border w-1/6 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Currency from</label>
            <select value={currencyFrom} onChange={(e) => setCurrencyFrom(e.target.value)} className="block appearance-inline w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>Bitcoin</option>
              <option>Ethereum</option>
              <option>Ripple</option>
              <option>Litcoin</option>
            </select>
          </div>

          <div className="border w-1/6 p-5">
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
                p-2.5
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
          <div className="flex space-x-2 justify-center items-center border w-1/1 p-5"> = </div>
          <div className="border w-1/6 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Currency to</label>
            <select value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)} className="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="border w-1/6 p-5">
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
                p-2.5
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
          <div className="flex space-x-2 justify-center  border w-1/6 p-5 items-center">
            <button
              onClick={() => sendData()}
              disabled={loader}
              type="button" className="w-24 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
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
          <div className="border w-1/5 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">From date</label>
            <input value={dates.dateIni} type="date"
              class="form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Select a date" />
          </div>
          <div className="border w-1/5 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">To date</label>
            <input value={dates.dateEnd} type="date"
              class="form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Select a date" />

          </div>
          <div className="border w-1/5 p-5">
            <label className="form-label inline-block mb-2 text-gray-300">Type</label>
            <select value={currencyTo} onChange={(e) => setCurrencyTo(e.target.value)} className="block appearance-none w-full border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>All</option>
              <option>--</option>
              <option>--</option>
            </select>
          </div>
          <div className="flex space-x-2 justify-center  border w-1/5 p-5 items-center">
            <button
              onClick={() => sendData()}
              disabled={loader}
              type="button" className="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
              {loader ? 'Filtering...' : 'Filter'}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          <table className="border-collapse border border-slate-500 w-full">
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
              {
                data.map((row, idx) =>
                  <tr key={idx}>
                    <td className="p-3 border border-slate-300 ...">{row.dateTime}</td>
                    <td className="p-3 border border-slate-300 ...">{row.currencyFrom}</td>
                    <td className="p-3 border border-slate-300 ...">{row.amount}</td>
                    <td className="p-3 border border-slate-300 ...">{row.currencyTo}</td>
                    <td className="p-3 border border-slate-300 ...">{row.value}</td>
                    <td className="p-3 border border-slate-300 ...">{row.type}</td>
                  </tr>
                )
              }

            </tbody>
          </table>
        </div>
        {/* paginator */}
        <div className="flex flex-wrap m-2">
          Paginator
        </div>
        {/* paginator */}
      </footer>
    </div>
  )
}
