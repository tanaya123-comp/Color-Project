
import React,{Component} from 'react';
import { withStyles } from "@material-ui/core/styles";


const styles={
    
    root:{
        width: "20%",
        height:"25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-0.3px",
        "&:hover button":{
                opacity:1,
        }
    }

};

 function DraggableBox(props) {

    

    return <div className={props.classes.root} style={{backgroundColor:props.color}}>{props.color}</div>;
    
}

export default withStyles(styles)(DraggableBox);