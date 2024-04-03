import './App.css'; 
// import Home from './Home';
import Home from './component/home'; 
import Upload from './component/upload'
// import { BrowserRouter, Route, Switch, Navlink } from 'react-router-dom';

function App() {
  let Component
  switch(window.location.pathname){ 
    case "/":
      Component = <Home/>
      break;  
    case "/upload": 
      Component = <Upload/>
      break; 
    default:
      break;
  }
  return ( 
      <div className="App"> 
        <div> 
          {Component}
        </div> 
      </div> 
  );
}

export default App;
