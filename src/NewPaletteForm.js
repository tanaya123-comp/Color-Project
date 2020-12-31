import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";


import DraggableBox from './DraggableBox';

import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

import PaletteFormNav from './PaletteFormNav';

import ColorPickerForm from './ColorPickerForm';



//import DraggableColorBox from './DraggableColorBox';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

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
  
 handleSubmit(newPaletteName)
 {
   
    const newPalette={
      paletteName:newPaletteName,
      id:newPaletteName.toLocaleLowerCase().replace(/ /g,"-"),
      colors:this.state.colors
    };
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

          <Typography variant='h4'>Design Your Palette</Typography>
          <div>
            <Button variant='contained' color='secondary' onClick={this.clearColors}>CLEAR PALETTE</Button>
            <Button variant='contained' color='primary' disabled={isPaletteFull} onClick={this.addRandomColor}>RANDOM COLOR</Button>
          </div>
          {/* <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor}/>

          <ValidatorForm onSubmit={this.addNewColor}>

            <TextValidator value={this.state.newColorName} name="newColorName" onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}/>

            <Button 
            variant='contained'
             color='primary'
              type="submit" 
              disabled={isPaletteFull}
              style={{backgroundColor:isPaletteFull?"grey": this.state.currentColor}}
               >
                 {isPaletteFull?"Palette Full":"Add Color"}
                 </Button>

          </ValidatorForm> */}

         
          <ColorPickerForm isPaletteFull={isPaletteFull} colors={this.state.colors} addNewColor={this.addNewColor}/>
         

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
              />
          
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);