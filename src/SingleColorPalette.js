import { colors } from '@material-ui/core';
import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './SingleColorPalette.css';


class SingleColorPalette extends Component{

        constructor(props){
            super(props);

            this._shades=this.gatherColors(this.props.palette,this.props.colorId);
            console.log(this._shades)
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
                        <ColorBox key={c.id} name={c.name} background={c.hex} showLink={false}/>
                ));

                return(
                        <div className="Pallete">
                                <h2>Single Color Palette</h2>
                                <div className="Pallete-colors">
                                        {colorboxes}
                                </div>
                        </div>
                );

        }

}

export default SingleColorPalette;