import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import styles from './styles/NewPaletteFormStyles';




import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

import PaletteFormNav from './PaletteFormNav';

import ColorPickerForm from './ColorPickerForm';

import seedColors from './seedColors';



//import DraggableColorBox from './DraggableColorBox';



class NewPaletteForm extends Component {

  static defaultProps={
    maxColors:20
  }

 constructor(props){
   super(props);
   this.state={
     open:true,
   
     newColorName:"",
     colors:this.props.palettes[0].colors,
     newPaletteName:"",
   };

   this.updateCurrentColor=this.updateCurrentColor.bind(this);

   this.addNewColor=this.addNewColor.bind(this);

   this.handleChange=this.handleChange.bind(this);

   this.handleSubmit=this.handleSubmit.bind(this);

   this.removeColor=this.removeColor.bind(this);

   this.clearColors=this.clearColors.bind(this);

   this.addRandomColor=this.addRandomColor.bind(this);
 }
  
 handleSubmit(newPalette)
 {
   newPalette.id=newPalette.paletteName.toLowerCase().replace(/ /g,"-");
   newPalette.colors=this.state.colors;
    
    this.props.savePalette(newPalette);

    this.props.history.push("/");
 }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor(newColor){

    this.setState({currentColor:newColor.hex});

  }

  removeColor(colorName){
      this.setState({
        colors:this.state.colors.filter(color=>color.name!==colorName)
      })
  }

  
  
  addNewColor(newColor){

    // const color={

    //   color:this.state.currentColor,

    //   name:this.state.newColorName,

    // };

    this.setState({colors:[...this.state.colors,newColor]});
  }

  handleChange(evt){
      this.setState({[evt.target.name]:evt.target.value});
  }

  onSortEnd=({oldIndex,newIndex})=>{
    this.setState(({colors})=>({
      colors:arrayMove(colors,oldIndex,newIndex)
    }))
  };
 
  clearColors(){
      this.setState({colors:[]});
  }

  addRandomColor(){
    const allColors=this.props.palettes.map(p=>p.colors).flat();
    var rand=Math.floor(Math.random()*allColors.length);
    const randomColor=allColors[rand];
    this.setState({colors:[...this.state.colors,randomColor]});
    console.log(randomColor);
  }

  render() {
    const { classes,maxColors,palettes } = this.props;
    const { open } = this.state;
    const isPaletteFull=this.state.colors.length>=20;

    return (
      <div className={classes.root}>
       

        <PaletteFormNav open={open} classes={classes} palettes={palettes} handleDrawerOpen={this.handleDrawerOpen} handleSubmit={this.handleSubmit}/>

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />


          <div className={classes.leftcontainer}>
          <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
          <div className={classes.buttons}>
            <Button variant='contained' color='secondary' className={classes.button} onClick={this.clearColors}>CLEAR PALETTE</Button>
            <Button variant='contained' color='primary' className={classes.button} disabled={isPaletteFull} onClick={this.addRandomColor}>RANDOM COLOR</Button>
          </div>
         

         
          <ColorPickerForm isPaletteFull={isPaletteFull} colors={this.state.colors} addNewColor={this.addNewColor}/>
         
            </div>


        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          
              <DraggableColorList
               colors={this.state.colors}
                removeColor={this.removeColor}
                axis="xy"
                onSortEnd={this.onSortEnd}
                distance={20}
              />
          
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);