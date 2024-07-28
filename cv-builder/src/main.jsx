import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import Header from './components/Header'
import "./styles/main.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="container">
      <Header />
      <App />
      <div className='author'><p>By <a className='nameAuthor' href="https://github.com/StarPlatinumSan">StarPlatinumSan</a></p></div>
    </main>
  </React.StrictMode>,
)
