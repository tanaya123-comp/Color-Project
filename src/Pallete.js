import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './Pallete.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Pallete extends Component{

        constructor(props){

            super(props);

            this.state={ level: 500 };

            this.changeLevel=this.changeLevel.bind(this);

        }

         changeLevel(level) {
            this.setState({level});
        }

        render()
        {
            const { colors } =this.props.palette;
            const { level } =this.state;
            const colorBoxes=colors[level].map(c=>{
                    
                return  <ColorBox background={c.hex} name={c.name}/>
            });

          

            return(
                <div className="Pallete">
                    <Slider defaultValue={this.state.level} step={100} min={100} max={900} onAfterChange={this.changeLevel}/>
                    <div className="Pallete-colors">
                        {colorBoxes}
                    </div>

                </div>
            );
        }

}

export default Pallete;