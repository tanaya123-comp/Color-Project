import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm,TextValidator} from "react-material-ui-form-validator";
import {Picker} from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component{

        constructor(props){
            super(props);

            this.state={
                open:true,
                newPaletteName:"",
                stage:"form",
            }

            this.handleChange=this.handleChange.bind(this);

            this.emojiPicker=this.emojiPicker.bind(this);

            this.savePalette=this.savePalette.bind(this);
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

          emojiPicker(){
              this.setState({stage:"emoji"});
          }

          savePalette(emoji){

              const newPalette={
                paletteName:this.state.newPaletteName,
                emoji:emoji.native,
              }

              this.props.handleSubmit(newPalette);
              this.setState({stage:""});
          }

          


        render()
        {
            const {open,newPaletteName} =this.state

            const {hideForm,handleSubmit} =this.props;

                return(
                    <div>

                    <Dialog open={this.state.stage==="emoji"} onClose={hideForm}>
                    <Picker onSelect={this.savePalette} />
                    </Dialog>
                               
                    <Dialog open={this.state.stage==="form"} onClose={this.handleClose} aria-labelledby="form-dialog-title" onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">Create Palette</DialogTitle>
                    <ValidatorForm onSubmit={this.emojiPicker}>
                    <DialogContent>
                    <DialogContentText>
                      Enter Palette Name to create a Palette ,make sure it is unique!
                    </DialogContentText>
          
                   

                  <TextValidator value={this.state.newPaletteName} onChange={this.handleChange} name="newPaletteName"  label="Palette Name" 
                    validators={['required','isPaletteNameUnique']} errorMessages={['Palette Name required','palette name must be unique']}/>



                  </DialogContent>
                  <DialogActions>
                   <Button onClick={hideForm} color="primary">
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