import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';

class PaletteList extends Component{

        constructor(props){

            super(props);
        
        }

        render()
        {
            return(
                <div>
                    <MiniPalette/>
                    {this.props.palettes.map(palette => (
                                <p>
                                        <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
                                    
                                </p>
                                    
                
                            
                            
                     ) ) }


                </div>
                
            );
        }

}

export default PaletteList;