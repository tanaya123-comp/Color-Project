import { colors } from '@material-ui/core';
import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './SingleColorPalette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import chroma from 'chroma-js';

const styles={

        Palette:{
            height: "100vh",   
        display: "flex",
        flexDirection: "column",
        },
        Colors:{
            height: "90%",
        },
        goBack:{
                width: "20%",
                height: "50%",
                margin: "0 auto",
                display: "inline-block",
                position: "relative",
                cursor: "pointer",
                marginBottom: "-0.3px",
                opacity:1,
                backgroundColor:"black",
                "& a":{
                        color:"white",
                        width: "100px",
            height:"30px",
            position: "absolute",
            display: "inline-block",
            top:"50%",
            left:"50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255,255,255,0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            
                }
               
        }
    
    };

class SingleColorPalette extends Component{

        constructor(props){
            super(props);

            this._shades=this.gatherColors(this.props.palette,this.props.colorId);
            console.log(this._shades)

            this.state={ format:"hex" };

           

            this.changeFormat=this.changeFormat.bind(this);
        }
      
    
            changeFormat(val){
    
                this.setState({format:val});
    
            }
    

        gatherColors(paletteId,colorId){

                let shades=[];

                let allColors=paletteId.colors;

                for(let k in allColors)
                {
                        shades=shades.concat(
                                allColors[k].filter(c=>(c.id===colorId)

                                ));
                }
                return shades.slice(1);
        }

        render(){
                const { classes } =this.props;
                const colorboxes=this._shades.map(c=>(
                        <ColorBox key={c.id} name={c.name} background={c[this.state.format]} showLink={false}/>
                ));

                return(
                        <div className={classes.Palette}>
                                <Navbar changeFormat={this.changeFormat} showAllColors={false} />
                                <div className={classes.Colors}>
                                        {colorboxes}
                                        <div className={classes.goBack}>
                                        <Link to={`/palette/${this.props.palette.id}`} >Go Back</Link>
                                        </div>
                                       
                                </div>
                                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
                        </div>
                );

        }

}

export default withStyles(styles)(SingleColorPalette);