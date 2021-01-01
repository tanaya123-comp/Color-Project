
import React,{Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Transform } from '@material-ui/icons';
import {SortableElement} from 'react-sortable-hoc';
import styles from './styles/DraggableBoxStyles';




const DraggableBox= SortableElement((props)=> {

    const {classes,name,handleClick,color}=props
    

    return(
        <div className={classes.root} style={{backgroundColor:color}}>

        
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon onClick={handleClick} className={classes.deleteIcon}/>
            </div>

        </div>
        
    )
    
    
})

export default withStyles(styles)(DraggableBox);