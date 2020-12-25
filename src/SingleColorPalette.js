import { colors } from '@material-ui/core';
import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './SingleColorPalette.css';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';


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
                const colorboxes=this._shades.map(c=>(
                        <ColorBox key={c.id} name={c.name} background={c[this.state.format]} showLink={false}/>
                ));

                return(
                        <div className="Pallete">
                                <Navbar changeFormat={this.changeFormat} showAllColors={false} />
                                <div className="Pallete-colors">
                                        {colorboxes}
                                </div>
                                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
                        </div>
                );

        }

}

export default SingleColorPalette;