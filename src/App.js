import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

import Pallete from './Pallete';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import {Switch,Route} from 'react-router-dom';
import { Palette } from '@material-ui/icons';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

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
            <Route exact path="/" render={(routeProps)=><PaletteList palettes={seedColors} {...routeProps}/>}/>
            <Route exact path="/palette/:id" render={(routeProps)=><Pallete palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
            <Route exact path="/palette/:paletteId/:colorId" render={()=> <SingleColorPalette/>} />
          </Switch>

          // <div>
          //   <Pallete palette={generatePalette(seedColors[2])}/>
          // </div>
      );
    }

}

export default App;
