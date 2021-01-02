export default {
    root:{
         backgroundColor:"white",
         border:"1px solid black",
         padding:"0.5rem",
         position:"relative",
         overflow:"hidden",
         cursor:"pointer",
         "&:hover svg":{      //we can't access class names as they are dynamic
             opacity:1
         }
 
    },
    coloring:{
         backgroundColor:"#dae1e4",
         height:"150px",
         width:"100%",
         borderRadius:"5px",
         overflow:"hidden",
    },
    title:{
         display:"flex",
         justifyContent:"space-between",
         alignItems:"centre",
         margin:"0",
         color:"black",
         paddingTop:"0.5rem",
         fontSize:"1rem",
         position:"relative",
    },
    emoji:{
         marginLeft:"0.5rem",
         fontSize:"1.5rem",
    },
    miniColors:{
     height:"25%",
     width:"20%",
     display:"inline-block",
     margin:"0 auto",
     position:"relative",
     marginBottom:"-3.5px",
     backgroundColor:"pink"
    },
    delete:{

    },
    deleteIcon:{
         color:"white",
         backgroundColor:"#eb3d30",
         width:"20px",
         height:"20px",
         position:"absolute",
         right:"0px",
         top:"0px",
         padding:"10px",
          zIndex:10,
          opacity:0,
    }
 
 
 };