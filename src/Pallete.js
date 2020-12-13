import React,{Component} from 'react';

class Pallete extends Component{

        constructor(props){

            super(props);

        }


        render()
        {
            return(
                <div className="Pallete">
                    <h1>Pallete</h1>

                    <div className="Pallete-colors"></div>

                </div>
            );
        }

}

export default Pallete;