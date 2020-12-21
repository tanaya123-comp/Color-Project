import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';

const styles={

    root:{
        backgroundColor:"blue",
        height:"100%",
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"centre",
    },
    container:{
        width:"50%",
        display:"flex",
        alignItems:"flex-start",
        flexDirection:"column",
        flexwrap:"wrap",
        border:"1px solid white",

    },
    nav:{
        display:"flex",
        width:"100%",
        justifyContent:"space-content",
        color:"white",
    },
    palettes:{
        boxSizing:"border-box",
        width:"100%",
        display:"grid",
        gridTemplateColumns:"repeat(3,30%)",
        gridGap:"5%",

    }

};



class PaletteList extends Component{

        constructor(props){

            super(props);
        
        }

        render()
        {


            return(
                <div className={this.props.classes.root}>
                   
                   <div className={this.props.classes.container}>
                       <nav className={this.props.classes.nav}>
                            <h1>React Colors</h1>
                       </nav>
                       <div className={this.props.classes.palettes}>

                       {this.props.palettes.map(palette => (
                                <p>
                              
                                     <MiniPalette {...palette}/>
                                </p>
                     ) ) }

                       </div>

                   </div>

                    


                </div>
                
            );
        }

}

export default withStyles(styles)(PaletteList);