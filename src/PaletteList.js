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
                   
                    {this.props.palettes.map(palette => (
                                <p>
                              
                                     <MiniPalette {...palette}/>
                                </p>
                                    
                
                            
                            
                     ) ) }


                </div>
                
            );
        }

}

export default PaletteList;