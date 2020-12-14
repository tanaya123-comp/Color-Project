import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './Pallete.css';

class Pallete extends Component{

        constructor(props){

            super(props);

        }


        render()
        {
            const colorBoxes=this.props.seed.colors.map(c=>{
                    
                return  <ColorBox background={c.color} name={c.name}/>
            });

          

            return(
                <div className="Pallete">
                    <div className="Pallete-colors">
                        {colorBoxes}
                    </div>

                </div>
            );
        }

}

export default Pallete;