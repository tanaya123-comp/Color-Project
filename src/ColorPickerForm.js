import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from 'react-color';
import { withStyles } from "@material-ui/core/styles";


import {ValidatorForm,TextValidator} from "react-material-ui-form-validator";


import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component{

        constructor(props){
            super(props);
            this.state={
                currentColor:"teal",
                newColorName:"",
            }

            this.updateCurrentColor=this.updateCurrentColor.bind(this);

            this.handleChange=this.handleChange.bind(this);

            this.handleSubmit=this.handleSubmit.bind(this);

        }


        componentDidMount() {
            ValidatorForm.addValidationRule('isColorNameUnique', value => (
                this.props.colors.every(currColor => (
                    currColor.name.toLowerCase() !== value.toLowerCase()
                ))
            ));
        
            ValidatorForm.addValidationRule('isColorUnique', value => (
                this.props.colors.every(currColor => (
                    currColor.color !== this.state.currentColor
                ))
            ));
        
          
          }

        updateCurrentColor(newColor){

            this.setState({currentColor:newColor.hex});
        
          }


          handleChange(evt){
            this.setState({[evt.target.name]:evt.target.value});
        }

        handleSubmit(){

                const newColor={
                    color:this.state.currentColor,
                    name:this.state.newColorName,
                }

                this.props.addNewColor(newColor);
                this.setState({newColorName:""});
        }
        

        render(){

            const {isPaletteFull,classes}=this.props;

        

            const {currentColor,newColorName}=this.state;

            return(
                <div>
        <ChromePicker
         color={currentColor} 
         onChangeComplete={this.updateCurrentColor}
         className={classes.picker}
          />

        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>

            <TextValidator value={newColorName} name="newColorName" 
            onChange={this.handleChange}
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                className={classes.colorNameInput}
                variant="filled"
                placeholder="Color Name"
                margin="normal"
                errorMessages={['This field is required', 'Color name must be unique', 'Color already used']}/>

        <Button 
            variant='contained'
            color='primary'
             type="submit" 
            disabled={isPaletteFull}
            className={classes.addColor}
            style={{backgroundColor:isPaletteFull?"grey": currentColor}}
        >
         {isPaletteFull?"Palette Full":"Add Color"}
        </Button>

        </ValidatorForm>

                </div>
            );
        }

}

export default withStyles(styles)(ColorPickerForm);