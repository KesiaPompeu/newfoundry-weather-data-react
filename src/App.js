import TripTable from './TripTable'
import Widget from './TripWidget'
import { columns, data } from './data'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Vehicle Dashboard</h1>
      <h3><em>TODO: Fill in this table with as much useful information as possible</em></h3>
      <div className="widget-wrapper">
        {/* <Widget data={data} /> */}
      </div>
      <TripTable columns={columns} data={data} />
    </div>
  )
}

export default App
