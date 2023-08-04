import { Component } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import News from "./News";
import Feed from "./Feed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import SignUp from "./SignUp";
import Login from "./Login";
import NewsFunction from "./NewsFunction";

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {}
    }
  };

  logMeIn = (user) => {
    this.setState({
      user: user
    })
  }
  

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar user={this.state.user} x='hi'/>
          <Routes>
            <Route path="/" element={<Home user={this.state.user}/>}/>
            <Route path='/posts' element={<Feed user={this.state.user}/>}/>
            <Route path='/news' element={<News />}/>
            <Route path='/news2' element={<NewsFunction />}/>
            <Route path='/posts/create' element={<CreatePost user={this.state.user}/>}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/login' element={<Login logMeIn={this.logMeIn} />}/>
          </Routes> 

        </div>
      </BrowserRouter>
    );
  }
}

export default App;


