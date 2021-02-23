import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';

function App() {
  return (
    <div>
      <Navbar dart color="dark">
        <div className="container">
           <NavbarBrand href="/"> Ristorante Con Fusion </NavbarBrand>
        </div>
      </Navbar>

        <Menu />
    </div>
  );
}

export default App;
