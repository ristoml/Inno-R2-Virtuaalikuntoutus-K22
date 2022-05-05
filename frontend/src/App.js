/* This component contains the Router, which defines the routes for the pages Home and Info */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Info from './pages/Info'

const App = () => {  
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/info' element={<Info />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
