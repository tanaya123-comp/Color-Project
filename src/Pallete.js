import React,{Component} from 'react';
import ColorBox from './ColorBox';
import './Pallete.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Navbar from './Navbar';

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
            const colorBoxes=colors[level].map(c=>{
                    
                return  <ColorBox background={c[format]} name={c.name} key={c.id} id={c.id} paletteId={id} showLink={true}/>
            });

          

            return(
                <div className="Pallete">
                    
                    <Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat}/>
                   
                    <div className="Pallete-colors">
                        {colorBoxes}
                    </div>
                    <br/>
                    <br/>
                    <footer className="Palette-footer">
                            {paletteName}
                            <span className="emoji">{emoji}</span>
                    </footer>

                </div>
            );
        }

}

export default Pallete;