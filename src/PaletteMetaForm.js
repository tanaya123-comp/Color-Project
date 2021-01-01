import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm,TextValidator} from "react-material-ui-form-validator";

class PaletteMetaForm extends Component{

        constructor(props){
            super(props);

            this.state={
                open:true,
                newPaletteName:"",
            }

            this.handleChange=this.handleChange.bind(this);
        }

        componentDidMount(){
            ValidatorForm.addValidationRule('isPaletteNameUnique', value => (
                this.props.palettes.every(paletteName => (
                    paletteName.paletteName.toLowerCase() !== this.state.newPaletteName.toLowerCase()
                ))
            ));
        }

         handleClickOpen = () => {
            this.setState({open:true});
          };
        
         handleClose = () => {
            this.setState({open:false});
          };

          handleChange(evt){
            this.setState({[evt.target.name]:evt.target.value});
        }

          


        render()
        {
            const {open,newPaletteName} =this.state

                return(
                        <div>
                               
      <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Palette</DialogTitle>
        <ValidatorForm onSubmit={()=>this.props.handleSubmit(newPaletteName)}>
        <DialogContent>
          <DialogContentText>
            Enter Palette Name to create a Palette ,make sure it is unique!
          </DialogContentText>
          
<TextValidator value={this.state.newPaletteName} onChange={this.handleChange} name="newPaletteName"  label="Palette Name" 
validators={['required','isPaletteNameUnique']} errorMessages={['Palette Name required','palette name must be unique']}/>



        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">Save Palette</Button>
        </DialogActions>
        </ValidatorForm>
      </Dialog>

                        </div>
                );

        }

}

export default PaletteMetaForm;