import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class PaletteList extends Component{

        constructor(props){

            super(props);
        
        }

        render()
        {
            return(
                <div>
                    <h1>Palette List Goes Here...</h1>
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