import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Header from './components/Header'
import SideSections from "./components/SideSections"
import ResumeStyle from "./components/ResumeStyle"
import Template from "./components/Template"
import Footer from "./components/Footer"
import "./styles/main.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="container">
      <Header />
      <div className="main">
        <SideSections />
        <App />
        <ResumeStyle />
      </div>
      <Footer />
    </main>
  </React.StrictMode>,
)
