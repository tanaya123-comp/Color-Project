import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteList';
import { withStyles } from '@material-ui/styles';
import { CSSTransition,TransitionGroup} from 'react-transition-group';


// const styles={

//     root:{
//         backgroundColor:"blue",
//         height:"100%",
//         display:"flex",
//         alignItems:"flex-start",
//         justifyContent:"centre",
//     },
//     container:{
//         width:"50%",
//         display:"flex",
//         alignItems:"flex-start",
//         flexDirection:"column",
//         flexwrap:"wrap",
//         border:"1px solid white",

//     },
//     nav:{
//         display:"flex",
//         width:"100%",
//         justifyContent:"space-content",
//         color:"white",
//     },
//     palettes:{
//         boxSizing:"border-box",
//         width:"100%",
//         display:"grid",
//         gridTemplateColumns:"repeat(3,30%)",
//         gridGap:"5%",

//     }

// };



class PaletteList extends Component{

        constructor(props){

            super(props);
            this.gotoPalette=this.gotoPalette.bind(this);
        
        }

        gotoPalette(id)
        {
            this.props.history.push(`/palette/${id}`);

        }

        render()
        {


            return(
                <div className={this.props.classes.root}>
                   
                   <div className={this.props.classes.container}>
                       <nav className={this.props.classes.nav}>
                            <h1 className={this.props.classes.heading}>React Colors</h1>
                            <Link to='/palette/new'>Create New Palette</Link>
                       </nav>
                       
                        <TransitionGroup className={this.props.classes.palettes}>

                     
                       {this.props.palettes.map(palette => (
                            
                                    <CSSTransition key={palette.id} className="fade" timeout={500}>

                                    
                                     <MiniPalette {...palette} handleDelete={this.props.deletePalette} handleClick={()=>this.gotoPalette(palette.id)} key={palette.id} id={palette.id}/>

                                     </CSSTransition>
                    
                     ) ) }
                           </TransitionGroup>
                       

                   </div>

                    


                </div>
                
            );
        }

}

export default withStyles(styles)(PaletteList);