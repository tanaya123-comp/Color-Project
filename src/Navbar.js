import React,{Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';



import styles from './styles/NavBarStyles';


// const styles={
//     Navbar:{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         height: "6vh",
    
//     },
    
//     logo:{
//         marginRight: "15px",
//         padding: "0 13px",
//         fontSize: "22px",
//         backgroundColor: "#eceff1",
//         fontFamily: "Roboto",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         "& a":{
//             textDecoration: "none",
//             color: "black",
//         }
    
//     },
    
    
    
    
//     slider :{
//         width: "350px",
//         margin: "0 10px",
//         display: "inline-block",

//         "& rc-slider-track":{
//             backgroundColor: "transparent",
//         },
        
//         "& rc-slider-rail":{
//             height: "8px",
//         },
        
//         "& rc-slider-handle,rc-slider-handle:active,rc-slider-handle:hover,rc-slider-handle:focus":{
//             backgroundColor: "green",
//             outline: "none",
//             border:"2px solid green",
//             boxShadow: "none",
//             width:"13px",
//             height: "13px",
//             marginLeft: "-7px",
//             marginTop: "-3px",
        
//         },
        
        
        
//     },
//     selectContainer:{
//         marginLeft: "auto",
//         marginRight: "1rem",
//     }

    
    
// }


class Navbar extends Component{

    constructor(props){
        super(props);

        this.state={format:"hex",open:false}

        this.handleChange=this.handleChange.bind(this);

        this.closeSnackbar=this.closeSnackbar.bind(this);

    }

    handleChange(e)
    {
        this.setState({format:e.target.value,open:true});
        console.log(this.state.format);
        this.props.changeFormat(e.target.value);

    }

    closeSnackbar()
    {
        this.setState({open:false});
    }

    render()
    {
        const {classes} = this.props;

        return(
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                
                {this.props.showAllColors && (
                <div className="slider-container">
                    <span>Level :{this.props.level}</span>
                <div className={classes.slider}>
                    <Slider  defaultValue={this.props.level} step={100} min={100} max={900} onAfterChange={this.props.changeLevel}/>
                    </div>
                </div>
                )}

                <div className={classes.selectContainer}>
                    <Select value={this.state.format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX- #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB-rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA-rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"left"}}
                open={this.state.open}
                autoHideDuration={3000}
                message={<span id="message-id">Format Changed to {this.state.format.toUpperCase()}</span>}
                ContentProps={{
                    "aria-describedby":"message-id"

                }}
                onClose={this.closeSnackbar}
                action={[
                        <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
                            <CloseIcon/>
                        </IconButton>
                ]}/>
                
            </header>
        );
            


    
    }

}

export default withStyles(styles)(Navbar);