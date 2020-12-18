import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import Pallete from './Pallete';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import {Switch,Route} from 'react-router-dom';

class App extends Component{

    constructor(props){

      super(props);

    }


    render()
    {
      return(
          <Switch>
            <Route exact path="/" render={()=><h1>list of Component</h1>}/>
            <Route exact path="/palette/:id" render={()=><h1>Individual Component</h1>}/>
          </Switch>

          // <div>
          //   <Pallete palette={generatePalette(seedColors[2])}/>
          // </div>
      );
    }

}

export default App;
