import './App.css';
import Header from './component/Header'
import Home from './component/Home'
import Footer from './component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home />} />
            
          
          </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
