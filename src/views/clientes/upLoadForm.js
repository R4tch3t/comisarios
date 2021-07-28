
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Update from "@material-ui/icons/ViewCompact";
import Zoom from '@material-ui/core/Zoom';
import {upLoadD} from "views/clientes/methods"
import { v4 as uuidv4 } from 'uuid';
export default (props)=>{
    const {c} = props;
    const {CTA} = c.state
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const selectFile = async () => {
      console.log("selectFile"+CTA);    
        const file = document.querySelector('#file-input').files[0]
        const result = await toBase64(file).catch(e => e);
        document.getElementById("file-input").value=""
        if (result instanceof Error) {
        console.log('Error: ', result.message);
            return;
        }
        c.base64 = `${result}`
        document.getElementById('fileToUp').value = file.name
        const uuid = uuidv4();
        //const {dataFiles} = c.state;
        //dataFiles.push({key: '',nombre: file.name, descripcion: '', opciones: ''});
        c.state.dataFiles.push({key: '', CTA, nombre: file.name, descripcion: '', opciones: '',uuid});
        c.setState({bandFS: true});
        //c.state.dataFiles.push({key: '',nombre: file.name, descripcion: '', opciones: ''});
       // document.getElementById('doc'+CTA).innerHTML = file.name
        //c.bandUpTramite = false;
        c.showNotification('trBO','CARGANDO... 0 %',CTA);
        //c.serialScan=Math.random()+""
        //c.serialScan='0'
        upLoadD(uuid,CTA,c);
        //noDisabled()
        //c.updateNB()
    };

    return (<>
        <input id={"file-input"} type="file" onChange={selectFile} name="avatar" style={{display: 'none'}} />
        <input id={"fileToUp"} type="text"  style={{border: 'none', textAlign: 'center', color: 'red'}} disabled />
        <div>
            <Zoom
                //key={fab.color}
                in={true}
                onClick={()=>{
                    //CTA=row.key
                    document.getElementById('file-input').click()
                }}
                
                timeout={transitionDuration}
                style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
                }}
                unmountOnExit
            >
                        
                        <Fab color='default' style={{backgroundColor: 'green', color:'white'}} aria-label="add">
                            
                        <Update/>
                        </Fab>
                        
            </Zoom>
        </div>
    </>)
}