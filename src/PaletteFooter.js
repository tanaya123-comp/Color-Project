import React,{Component} from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteFooterstyles';

function PaletteFooter(props){

    const {classes} =props;
    return(
        <footer className={classes.PaletteFooter}>
        {props.paletteName}
        <span className={classes.Emoji}>{props.emoji}</span>
        </footer>
    );
}

export default withStyles(styles)(PaletteFooter);