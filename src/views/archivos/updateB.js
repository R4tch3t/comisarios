import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Done from "@material-ui/icons/Done";
import Zoom from '@material-ui/core/Zoom';
import {editFileG} from "views/clientes/methods"

export default (props)=>{
    const {c} = props;
    //const {CTA} = c.state
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const upDateFG = () => {
        const ID = document.getElementById("ID").value
        const nombre = document.getElementById("nombre").value
        const folio = document.getElementById("folio").value
        const descripcion = document.getElementById("descripcion").value
        const seccion = document.getElementById("seccion").value
        const asunto = document.getElementById("asunto").value
        const obs = document.getElementById("obs").value
        editFileG(c,ID,nombre,folio,descripcion,seccion,asunto,obs);
    }

    return (<>
        <div>
            <Zoom
                //key={fab.color}
                in={true}
                onClick={()=>{
                    //CTA=row.key
                   // document.getElementById('file-input').click()
                   upDateFG();
                }}
                
                timeout={transitionDuration}
                style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
                }}
                unmountOnExit
            >
                        
                <Fab color='default' style={{backgroundColor: '#0d6efd', color:'white'}} aria-label="add">
                    <Done/>
                </Fab>
                        
            </Zoom>
        </div>
    </>)
}