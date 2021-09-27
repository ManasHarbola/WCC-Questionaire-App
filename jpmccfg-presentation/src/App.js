import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Quiz from "./components/Quiz";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Score from "./components/Score";
import CreateQuestion from "./components/CreateQuestion";
import AddActionItemPage from "./components/AddActionItemPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/score">
            <Score />
          </Route>
          <Route path="/suggestion">
            <AddActionItemPage />
          </Route>
          <Route path="/create">
            <CreateQuestion />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
