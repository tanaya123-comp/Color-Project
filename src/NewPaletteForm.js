import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { colors } from "@material-ui/core";
import DraggableBox from './DraggableBox';
import {ValidatorForm,TextValidator} from "react-material-ui-form-validator";
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';



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
     currentColor:"teal",
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
  
 handleSubmit()
 {
   const newName=this.state.newPaletteName;
    const newPalette={
      paletteName:newName,
      id:newName.toLocaleLowerCase().replace(/ /g,"-"),
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

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value => (
        this.state.colors.every(currColor => (
            currColor.name.toLowerCase() !== value.toLowerCase()
        ))
    ));

    ValidatorForm.addValidationRule('isColorUnique', value => (
        this.state.colors.every(currColor => (
            currColor.color !== this.state.currentColor
        ))
    ));

    ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
      this.props.palettes.every(paletteName => (
          paletteName.paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
      ))
  ));
  }
  
  addNewColor(){

    const color={

      color:this.state.currentColor,

      name:this.state.newColorName,

    };

    this.setState({colors:[...this.state.colors,color]});
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
    const { classes,maxColors } = this.props;
    const { open } = this.state;
    const isPaletteFull=this.state.colors.length>=20;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create Palette
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator value={this.state.newPaletteName} onChange={this.handleChange} name="newPaletteName"  label="Palette Name" 
            validators={['required','isPaletteNameUnique']} errorMessages={['Palette Name required','palette name must be unique']}/>
            <Button variant="contained" color="secondary" type="submit">Save Palette</Button>
            </ValidatorForm>
           
          </Toolbar>
        </AppBar>
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
          <ChromePicker color={this.state.currentColor} onChangeComplete={this.updateCurrentColor}/>

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

          </ValidatorForm>

         
          
         

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