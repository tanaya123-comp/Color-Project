import React,{Component} from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';


// const styles ={
//    root:{
//         backgroundColor:"white",
//         border:"1px solid black",
//         padding:"0.5rem",
//         position:"relative",
//         overflow:"hidden",
//         "& hover":{
//             cursor:"pointer"
//         }

//    },
//    coloring:{
//         backgroundColor:"#dae1e4",
//         height:"150px",
//         width:"100%",
//         borderRadius:"5px",
//         overflow:"hidden",
//    },
//    title:{
//         display:"flex",
//         justifyContent:"space-between",
//         alignItems:"centre",
//         margin:"0",
//         color:"black",
//         paddingTop:"0.5rem",
//         fontSize:"1rem",
//         position:"relative",
//    },
//    emoji:{
//         marginLeft:"0.5rem",
//         fontSize:"1.5rem",
//    },
//    miniColors:{
//     height:"25%",
//     width:"20%",
//     display:"inline-block",
//     margin:"0 auto",
//     position:"relative",
//     marginBottom:"-3.5px",
//     backgroundColor:"pink"
//    }


// };

class MiniPalette extends Component{

        constructor(props){
            super(props);

            this.deletePalette=this.deletePalette.bind(this);
        }
        
        deletePalette(e){
            e.stopPropagation();
            this.props.handleDelete(this.props.id);
        }
        
        render(){
            const {classes,paletteName,emoji,colors} = this.props;
            console.log(colors);
            const miniColorBoxes=colors.map(color=>(
                   <div className={classes.miniColors} style={{background:color.color}} key={color.name}/>
            ));
        
    return(

        <div className={classes.root} onClick={this.props.handleClick}>
            <div className={classes.delete}>
                <DeleteIcon 
                className={classes.deleteIcon} 
                styles={{transition:"all 0.3s ease-in-out"}}
                onClick={this.deletePalette}
                />
            </div>
            <div className={classes.coloring}>
            {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
       
    );
    }

}

export default withStyles(styles)(MiniPalette);