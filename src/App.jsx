
import './App.css'
import Pokedex from './components/Pokedex/Pokedex.jsx'
import { Link } from 'react-router-dom'
import CustomRoutes from './Routes/CustomRoutes.jsx'


function App() {
  

  return (
    <div className='outer-pokedex'>
      <h1 id="pokedex-heading">
           <Link to = "/" > Asd's Pokemon</Link>

      </h1>
      <CustomRoutes/>
    </div>
  )
}

export default App
