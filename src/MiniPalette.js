import React from 'react';
import { withStyles } from '@material-ui/styles';



const styles ={
    main:{
        background:"purple",
        border:"3px solid teal",
        "& h1":{
            color:"white",
        }
    },
    secondary:{
        background:"blue",

    }

};

function MiniPalette(props){
        const {classes} =props;
        console.log(classes);
    return(
        <div className={classes.main}>
                 <h1>MiniPalette</h1>
                 <section className={classes.secondary}>
                    <h2>Mini Palette 2</h2>
                 </section>
        </div>
       
    );


}

export default withStyles(styles)(MiniPalette);