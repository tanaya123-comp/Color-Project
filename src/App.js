import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import Pallete from './Pallete';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import {Switch,Route} from 'react-router-dom';
import { Palette } from '@material-ui/icons';

class App extends Component{

    constructor(props){

      super(props);

    }

    findPalette(id){

      return seedColors.find(function(palette){
         return palette.id===id;
       });
     }

    render()
    {
       

      return(
          <Switch>
            <Route exact path="/" render={()=><h1>list of Component</h1>}/>
            <Route exact path="/palette/:id" render={(routeProps)=><Pallete palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
          </Switch>

          // <div>
          //   <Pallete palette={generatePalette(seedColors[2])}/>
          // </div>
      );
    }

}

export default App;
