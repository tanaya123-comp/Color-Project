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
            <Pallete {...seedColors[4]}/>
          </div>
      );
    }

}

export default App;
