import './App.css';
import Headers from './components/Headers';
import LoginPage from './components/LoginPage';
import Main from './components/Main';
import RegistrationPage from './components/RegistrationPage';
import { Route, Switch} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [authresponse, setAuthResponse] = useState('')
  //userAutenticationAPI
  const Authentication = async(token) => {
    try{
      const response = await axios.get('http://127.0.0.1:3500/protected',{ headers:{
        'Accept' : 'application/json',
        'Content-Type' :'application/json',
        'x-access-token' : token
        }},{
        headers:{
        'Accept' : 'application/json',
        'Content-Type' :'application/json',
        'x-access-token' : token
        }
    })
    }catch(err){
      if(err){
        return err
      }
    }
}
  return (
    <div className="App">
      <Switch>
          <Route path="/signup">
           <RegistrationPage/>
          </Route>
          <Route path="/home">
          <Headers/> 
          <Main />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      
    </div>
  );
}

export default App;
