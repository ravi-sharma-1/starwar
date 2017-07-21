import React, {Component} from 'react';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import utility from './utils/Utils.js'
import {postman} from './utils/postMan.js';
class App extends Component {
  constructor() {
    super()
    this.state = {
      switchInfo:[]
    }
  }

  componentDidMount(){
    postman.subscribe("LoggedIn", ()=>{
      let switchInfo = utility.util.getAuInfor()? utility.util.getAuInfor():[];
      if(switchInfo.length>0){
        this.props.history.push("/home")
      }
      this.setState({switchInfo:switchInfo});
    })
  }
  render() {
    console.log(this.state.switchInfo);
    return (
      <div>
        {this.state.switchInfo && this.state.switchInfo.length>0 && <Home/>||<Login/>}
      </div>
    );
  }
}
export default App;
