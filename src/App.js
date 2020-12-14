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
            <Pallete colors={seedColors[2].colors}/>
          </div>
      );
    }

}

export default App;
