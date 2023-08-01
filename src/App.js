import { Component } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import News from "./News";

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {
        username: "sho",
        email: 'shohat@codingtemple.com'
      }
    }
  }
  

  render(){
    return (
      <div className="App">
        <Navbar user={this.state.user} x='hi'/>
  
        <Home user={this.state.user} x='hi'/>
  
        {/* <News /> */}
  
      </div>
    );
  }
}

export default App;


