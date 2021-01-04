import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteList';
import { withStyles } from '@material-ui/styles';
import { CSSTransition,TransitionGroup} from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';




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

            this.state={
                openDeleteDialog:false,
                deleteId:"",
            }

            this.openDialog=this.openDialog.bind(this);

            this.closeDialog=this.closeDialog.bind(this);
        
            this.handleDelete=this.handleDelete.bind(this);

            this.gotoPalette=this.gotoPalette.bind(this);
        }

        gotoPalette(id)
        {
            this.props.history.push(`/palette/${id}`);

        }


        openDialog(id){
            this.setState({openDeleteDialog:true,deleteId:id});
        }


        closeDialog(){
            this.setState({openDeleteDialog:false,deleteId:""});
        }

        handleDelete(){

            this.props.deletePalette(this.state.deleteId);

            this.setState({openDeleteDialog:false,deleteId:""});

        }

        render()
        {

            const {openDeleteDialog,deleteId} =this.state;

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

                                    
                                     <MiniPalette
                                      {...palette}
                                     //  handleDelete={this.props.deletePalette} 
                                        openDialog={this.openDialog}
                                       handleClick={this.gotoPalette}
                                        key={palette.id} 
                                        id={palette.id}
                                        />

                                     </CSSTransition>
                    
                     ) ) }
                           </TransitionGroup>
                       

                   </div>

                    <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
                            <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
                            <List>
                                <ListItem button onClick={this.handleDelete}>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor:blue[100],color:blue[600]}}>
                                            <CheckIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>Delete</ListItemText>
                                </ListItem>
                                <ListItem button onClick={this.closeDialog}>
                                    <ListItemAvatar>
                                        <Avatar style={{backgroundColor:red[100],color:red[600]}}>
                                            <CloseIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>Cancel</ListItemText>
                                </ListItem>

                            </List>


                    </Dialog>


                    


                </div>
                
            );
        }

}

export default withStyles(styles)(PaletteList);