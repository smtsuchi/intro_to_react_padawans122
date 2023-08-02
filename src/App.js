import { Component } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import News from "./News";
import Feed from "./Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./CreatePost";

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
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} x='hi'/>
          <Routes>
            <Route path="/" element={<Home user={this.state.user} x='hi'/>}/>
            <Route path='/posts' element={<Feed />}/>
            <Route path='/news' element={<News />}/>
            <Route path='/posts/create' element={<CreatePost />}/>
          </Routes> 

        </div>
      </BrowserRouter>
    );
  }
}

export default App;


