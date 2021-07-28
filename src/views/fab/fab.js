import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import Zoom from '@material-ui/core/Zoom';
export default (props) => {
    const {c,bandIn, Icon, color, handleClick} = props;
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
return (
    <Zoom
                    //key={fab.color}
                  in={bandIn}
                  onClick={(e)=>{
                  //var delStack = 
                  /*Object.keys(c.deleteStack).map((key) => {                    
                    //  [Number(key), c.deleteStack[key]
                    console.log(key)
                    
                  });*/
                    //c.deleteCliente();
                    handleClick();
                    
                    }}
                    onMouseEnter={(e)=>{console.log(e)
                      
                    }}
                    onMouseLeave={
                      (e)=>{
                          /*
                        if(e.target.nodeName!=="BUTTON"){
                        e=e.target.parentElement
                        while(e.nodeName!=="BUTTON"){
                          e=e.parentElement
                        }
                      }else{
                        e=e.target
                      }
                      if(e.id===""){
                            e.style.opacity=0.5
                      }*/

                      }
                    }
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${bandIn?transitionDuration.exit:"0"}ms`,
                    }}
                    unmountOnExit
                  >
                    <Fab color={color} aria-label="add">
                          <Icon />
                    </Fab>
                  </Zoom>
)
}