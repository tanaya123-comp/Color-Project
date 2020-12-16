import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './Pallete.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Navbar from './Navbar';

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
                    
                    <Navbar level={level} changeLevel={this.changeLevel}/>
                   
                    <div className="Pallete-colors">
                        {colorBoxes}
                    </div>

                </div>
            );
        }

}

export default Pallete;