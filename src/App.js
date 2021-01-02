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
import NewPaletteForm from './NewPaletteForm';

class App extends Component{

    constructor(props){

      super(props);

      const savedPalettes=JSON.parse(window.localStorage.getItem('palettes'));

      this.state={
        palettes: savedPalettes ||seedColors
      };

      this.findPalette=this.findPalette.bind(this);

      this.savePalette=this.savePalette.bind(this);

      this.syncWithLocalStorage=this.syncWithLocalStorage.bind(this);

      this.deletePalette=this.deletePalette.bind(this);

    }

    findPalette(id){

      return this.state.palettes.find(function(palette){
         return palette.id===id;
       });
     }

     savePalette(newPalette){
       this.setState({palettes:[...this.state.palettes,newPalette]},this.syncWithLocalStorage);
     }

     syncWithLocalStorage(){
          window.localStorage.setItem('palettes',JSON.stringify(this.state.palettes));
     }

     deletePalette(id){
       this.setState(st=>({palettes:st.palettes.filter(palette=>palette.id!==id)}),
        this.syncWithLocalStorage
       )
     }

    render()
    {
       

      return(
          <Switch>
            <Route exact path='/palette/new' render={(routeProps)=> <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>}/>
            <Route exact path="/" render={(routeProps)=><PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps}/>}/>
            <Route exact path="/palette/:id" render={(routeProps)=><Pallete palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
            <Route exact path="/palette/:paletteId/:colorId"  render={(routeProps)=><SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>} />
          </Switch>

          // <div>
          //   <Pallete palette={generatePalette(seedColors[2])}/>
          // </div>
      );
    }

}

export default App;
