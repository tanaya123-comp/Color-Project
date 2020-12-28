import React,{Component} from 'react';
import ColorBox from './ColorBox';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyle';
import { withStyles } from '@material-ui/styles';


// const styles={

//     Palette:{
//         height: "100vh",   
//     display: "flex",
//     flexDirection: "column",
//     },
//     Colors:{
//         height: "90%",
//     }

// };

class Pallete extends Component{

        constructor(props){

            super(props);

            this.state={ level: 500 ,format:"hex" };

            this.changeLevel=this.changeLevel.bind(this);

            this.changeFormat=this.changeFormat.bind(this);

        }

         changeLevel(level) {
            this.setState({level});
        }

        changeFormat(val){

            this.setState({format:val});

        }

        render()
        {
            const { colors,paletteName,emoji,id } =this.props.palette;
            const { level ,format } =this.state;
            const { classes } =this.props;
            const colorBoxes=colors[level].map(c=>{
                    
                return  <ColorBox background={c[format]} name={c.name} key={c.id} id={c.id} paletteId={id} showLink={true}/>
            });

          

            return(
                <div className={classes.Palette}>
                    
                    <Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat} showAllColors={true}/>
                   
                    <div className={classes.Colors}>
                        {colorBoxes}
                    </div>
                    <br/>
                    <br/>
                    <PaletteFooter paletteName={paletteName} emoji={emoji}/>

                </div>
            );
        }

}

export default withStyles(styles)(Pallete);