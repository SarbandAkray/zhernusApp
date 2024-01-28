import React from 'react'

export function App() {
  const showMainWindow = (): void => window.electron.ipcRenderer.send('showMainWindow')
  const quitApp = (): void => window.electron.ipcRenderer.send('exit')
  return (
    <div
      className="font-rabar h-screen bg-gray-800 text-white flex flex-col text-center align-middle justify-center"
      dir="rtl"
    >
      <div className="w-screen px-2 py-5">
        <p className="text-xl md:text-2xl ">فایل :</p>
        <p className="text-xl md:text-2xl ">١١ دێر وەرگێراوە لە کۆی ٢٠ دێر</p>
      </div>
      <p>---------------------------</p>
      <div className="w-full flex flex-col align-middle justify-center px-5 gap-3 ">
        <button
          onClick={showMainWindow}
          className=" bg-green-500 text-white font-semibold py-2 px-4 border border-green-600 rounded-md shadow-md hover:bg-green-600 transition duration-300 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:hover:bg-green-500 disabled:hover:scale-100"
        >
          پیشاندان
        </button>
        <button
          onClick={quitApp}
          className=" bg-red-500 text-white font-semibold py-2 px-4 border border-red-600 rounded-md shadow-md hover:bg-red-600 transition duration-300 cursor-pointer hover:scale-105 disabled:opacity-50 disabled:hover:bg-red-500 disabled:hover:scale-100"
        >
          داخستن
        </button>
      </div>
    </div>
  )
}

export default App
