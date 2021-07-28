import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Search from "@material-ui/icons/Search";
import Zoom from '@material-ui/core/Zoom';

export default (props)=>{
    const {c} = props;
    //const {CTA} = c.state
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (<>
        
        <div>
            <Zoom
                //key={fab.color}
                in={true}
                onClick={()=>{
                    //CTA=row.key
        //            document.getElementById('file-input').click()
                }}
                
                timeout={transitionDuration}
                style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
                }}
                unmountOnExit
            >
                        
                <Fab color='default' style={{backgroundColor: '#0dcaf0', color:'white'}} aria-label="add">
                    <Search/>
                </Fab>
                        
            </Zoom>
        </div>
    </>)
}