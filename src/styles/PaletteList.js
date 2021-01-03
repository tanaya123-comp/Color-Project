import sizes from './sizes';
import bg from './bg.svg';

export default {
        "@global":{
            "fade-exit":{
                    opacity:1
            },
            "fade-exit-active":{
                opacity:0,
                transition:"opacity 500ms ease-out",
            }
        },

        root:{
            backgroundColor:"blue",
            height:"100%",
            display:"flex",
            alignItems:"flex-start",
            justifyContent:"centre",
            backgroundColor:"#1e8feb",
            backgroundImage:`url(${bg})`,
            overflow:"scroll",
        },
        container:{
            width:"80%",
            display:"flex",
            alignItems:"flex-start",
            flexDirection:"column",
            flexwrap:"wrap",
            border:"1px solid white",

            [sizes.down("xl")]:{
                width:"80%",
            },
            [sizes.down("xl")]:{
                width:"75%",
            },
    
        },
        nav:{
            display:"flex",
            width:"100%",
            justifyContent:"space-content",
            alignItems:"centre",
            color:"white",
            "& a":{
                color:"white",
            }
        },
        heading:{
            fontSize:"2rem",
        },
        palettes:{
            boxSizing:"border-box",
            width:"100%",
            display:"grid",
            gridTemplateColumns:"repeat(3,30%)",
            gridGap:"2.5rem",
            [sizes.down("xs")]:{
                gridTemplateColumns:"repeat(1,100%)",
            },
            [sizes.down("sm")]:{
                gridTemplateColumns:"repeat(2,50%)",
                gridGap:"1.4rem",
            },
        }
    
    
};