import React,{Component} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

class ColorBox extends Component{

        constructor(props){

            super(props);


            this.state={copied:false};

            this.changeOnCopy=this.changeOnCopy.bind(this);

        }

        changeOnCopy(){

                this.setState({copied:true},()=>{
                        setTimeout(()=>this.setState({copied:false}),1500);
                });

        }

        render(){
                const {name,background,id,paletteId,showLink} =this.props;
                const {copied}=this.state;
                const isDarkColor=chroma(background).luminance()<=0.08;
                const isLightColor=chroma(background).luminance()>=0.08;
            return(
                    <CopyToClipboard text={background} onCopy={this.changeOnCopy}>
                                 <div style={{background:background}} className="ColorBox">

                                        <div style={{background}} className={`copy-overlay ${copied &&"show"}`}/> 
                                        <div className={`copy-msg ${copied &&"show"}`}>
                                                <h1>copied</h1>
                                                <div className={isLightColor && "dark-text"}>
                                                <p>{this.props.background}</p>
                                                </div>
                                             
                                        </div>

                           <div className="copy-container">

                                <div className="box-content">
                                        <span className={isDarkColor&& "light-text"}>{name}</span>

                                </div>

                                <button className="copy-button">Copy</button>

                           </div>
                           {showLink && (
                           <Link to={`/palette/${paletteId}/${id}`} onClick={e=>e.stopPropagation()}>
                           <span className={`see-more ${isLightColor && "dark-text"}`}>More</span>
                           </Link>
                           )}
                                </div>
                    </CopyToClipboard>
                   
            );
        }

}

export default ColorBox;