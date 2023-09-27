import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import NavBar from './components/layout/NavBar';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';


export default function App() {
  return (
    <Router>
      <NavBar/>
        <Container customClass="min-height">
          <Routes>   
              <Route path='/' element={<Home/>}/>
              <Route path='/projects' element={<Projects/> }/>
              <Route path='/company' element={<Company/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/newproject' element={<NewProject/>}/>
              <Route path='/project/:id' element={<Project/>}/>
          </Routes>
        </Container>
      <Footer/>
    </Router>
  )
}