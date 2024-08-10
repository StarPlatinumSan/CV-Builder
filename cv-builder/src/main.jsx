import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Header from './components/Header'
import Footer from './components/Footer'
import "./styles/main.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="container">
    <Header />
    <App />
    <Footer />
    </main>
  </React.StrictMode>,
)
