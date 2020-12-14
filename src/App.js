import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import Pallete from './Pallete';
import seedColors from './seedColors';

class App extends Component{

    constructor(props){

      super(props);

    }


    render()
    {
      return(
          <div>
            <Pallete seed={seedColors[2]}/>
          </div>
      );
    }

}

export default App;
