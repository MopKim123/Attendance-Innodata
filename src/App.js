import './App.css'; 
// import Home from './Home';
import Home from './component/home'; 
import Upload from './component/upload'
import Report from './component/report'
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
    case "/report": 
      Component = <Report/>
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
