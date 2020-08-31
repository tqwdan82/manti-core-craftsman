import React from 'react';
import './App.css';
import {DevForm, LoadForm} from "./Module"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/craftsman/forms/form/:id" component={LoadForm}/>
          <Route path="/craftsman/forms/newForm" exact component={DevForm}/>
          <Route path="/craftsman/forms/updateForm/:id" component={DevForm}/>
          <Route path="/craftsman/forms/" exact component={DevForm}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
