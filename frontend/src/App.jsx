import './assets/css/style.css'
import Header from './components/Header.jsx'
import Main from './components/Main.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      <Header />

      {/* Main content grows and pushes footer down */}
      <main className="flex-grow-1">
        <Main />
      </main>

      <Footer />
    </div>
  )
}

export default App
