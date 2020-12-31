import React,{Component} from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableBox from './DraggableBox';


const DraggableColorList=SortableContainer(({colors,removeColor})=> {

    return (
        <div style={{height:"100%"}}>
            {colors.map((color,i)=>(
                  <DraggableBox 
                  index={i}
                  key={color.name} 
                  color={color.color}
                   handleClick={()=>removeColor(color.name)} 
                   name={color.name}/>
              ))}
        </div>

    )
    
})

export default DraggableColorList;