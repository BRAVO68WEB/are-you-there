import { useState } from 'react'
import './App.css'
import pingLogo from '/ping.png'

function App() {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState(80);
  const [latency, setLatency] = useState(0);

  const latencyStatus = () => {
    if (latency === 9999) {
      return (
        <div>
          <p
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >Offline</p>
        </div>
      )
    }
    if (latency < 100) {
      return (
        <div>
          <p
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >Fast</p>
        </div>
      )
    }
    if (latency < 500) {
      return (
        <div>
          <p
            style={{
              color: "orange",
              fontWeight: "bold",
            }}
          >Moderate</p>
        </div>
      )
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_API_URL}/?ip=${ip}&port=${port}`)
      .then((res) => res.json())
      .then((data) => {
        setLatency(data.latency)
      })
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={pingLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Is this online ??</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>IP Address</label>
            <br />
            <input 
              type="text" 
              placeholder="Enter IP Address"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
          </div>
          <div>
            <label>Port</label>
            <br />
            <input 
              type="text" 
              placeholder="Enter Port"
              value={port}
              onChange={(e) => setPort(Number(e.target.value))}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      {!latency ? null : (
        <div className="card">
          <h2>Latency</h2>
          <p>{latency} ms</p>
          {latencyStatus()}
        </div>
      )}
      <p className="read-the-docs">
        Source Code at <a href="https://github.com/BRAVO68WEB/are-you-there" target="_blank">github</a>
      </p>
    </>
  )
}

export default App
