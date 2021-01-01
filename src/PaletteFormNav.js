import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import PaletteMetaForm from './PaletteMetaForm';

import Button from "@material-ui/core/Button";

import {ValidatorForm,TextValidator} from "react-material-ui-form-validator";

import {Link} from 'react-router-dom';

const drawerWidth = 400;

const styles = theme => ({
root:{
  display:"flex",
},

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection:"row",
    justifyContent:"space-between",
    height:"64px",
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
  NavBtns:{
      marginRight:"1rem",
  },
  buttons:{
    margin:"0 0.5rem",
    textDecoration:"none",
  }

});


class PaletteFormNav extends Component{

        constructor(props)
        {
            super(props);
            this.state={
                newPaletteName:"",
                isFormShowing:false,
            };

            this.handleChange=this.handleChange.bind(this);

            this.showForm=this.showForm.bind(this);
        }

        componentDidMount(){
            ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
                this.props.palettes.every(paletteName => (
                    paletteName.paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
                ))
            ));
        }

        handleChange(evt){
            this.setState({[evt.target.name]:evt.target.value});
        }

        showForm(){
          this.setState({isFormShowing:true});
        }

        render()
        {
            const {classes,open} = this.props;
            const {newPaletteName}=this.state;
            return(
                <div className="root">
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
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant='h6' color='inherit' noWrap>
              Create Palette
            </Typography>

            
          </Toolbar>
          <div className={classes.NavBtns}>

          
{/* <ValidatorForm onSubmit={()=>this.props.handleSubmit(newPaletteName)}>
<TextValidator value={this.state.newPaletteName} onChange={this.handleChange} name="newPaletteName"  label="Palette Name" 
validators={['required','isPaletteNameUnique']} errorMessages={['Palette Name required','palette name must be unique']}/>
<Button variant="contained" color="primary" type="submit">Save Palette</Button>

</ValidatorForm> */}

      <Link to="/"><Button variant="contained" className={classes.buttons} color="secondary">Go Back</Button></Link>
      <Button variant="contained" className={classes.buttons} color="primary" onClick={this.showForm}>
        Save
      </Button>

        {this.state.isFormShowing && 
          <PaletteMetaForm palettes={this.props.palettes} handleSubmit={this.props.handleSubmit}/>
        }
</div>

        </AppBar>
                </div>
            );
        }

}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);