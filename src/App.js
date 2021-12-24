import { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar';
import Pusher from 'pusher-js'
import Axios from './Axios'
//import { Switch } from '@mui/material';
import { BrowserRouter as Router,Route,Routes, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';


function App() {

  const[messages,setmessages] =useState([]);

  //const [user,setUser]= useState(null)
  const [{user}, dispatch] = useStateValue();

  useEffect(()=>{
    Axios.get('/messages/sync').then((res)=>{
      setmessages(res.data)
    })
  } , [])
//*****************pusher for mongodb real chat */
  useEffect(()=>{
    const pusher = new Pusher('788456acb2d1d22a8ff6', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    //data is equial to messages
    channel.bind('inserted',(data)=> {
      //alert(JSON.stringify(data));
      setmessages([...messages,data])
    });


     return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }

  },[messages])

  console.log(messages)

  //********************** */
  return (
    <Router>  
      {
        !user?(<Login></Login>):
        ( <div className="app">
        <div className='app_body'>
        <Sidebar></Sidebar>
        <Switch>
          /***for send massges and save it on mongodb you should send massege as a param on CHAT component */
            <Route path="/rooms/:roomId">  <Chat></Chat> </Route>
            <Route path="/"> <Chat></Chat> </Route>
        </Switch>
        </div>
      </div>)
      } 
      
    </Router>

  );
}

export default App;
