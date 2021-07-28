import React from "react";
import encrypt from "views/Dashboard/encrypt";
import Fab from '@material-ui/core/Fab';
import Update from "@material-ui/icons/Publish";
import Zoom from '@material-ui/core/Zoom';
import Download from "@material-ui/icons/SaveAlt";
import Delete from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import FindInPage from "@material-ui/icons/FindInPage"
import {Input} from "reactstrap";
import ip from "variables/ip.js";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useTheme } from "@material-ui/core/styles";
import {editFile,deleteFile} from "views/clientes/methods"
import {upLoadDG} from "views/clientes/methods"
import { v4 as uuidv4 } from 'uuid';

export default (props) => {
  const {c,row,classes} = props
  const [bandSave, setBandSave] = React.useState(false);
  const [disabledRow, setDisabledRow] = React.useState(false);
  let ID, nombre, folio, descripcion, seccion, asunto, obs = null;
  
  // let descripcion = ''
  const getD = (uuid,CTA,idDoc,d) => {
    //tp = tp[0].toLowerCase()
    const docName=document.getElementById(uuid?(uuid+"DOCN"):(idDoc+"DOCN")).innerHTML
    let root = null;
    if(d){
      //url = `${ip(2998)}docomid/${CTA}/${docName}`;
      root="docomid"
    }else{
      //url = `${ip(2998)}docomi/${CTA}/${docName}`;
      root="docomi"
    }
    let url = `${ip(2998)}${root}/docsGeneral/${docName}`;
    const win = window.open(url, '_blank');
    win.focus();
  }

  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  
  const keyUpHandle = (e) => {
    console.log(e.which)  
    if(e.which>29&&e.which<41){
          return false
      }
    if(row.descripcion!==e.target.value||(!row.descripcion&&!e.target.value)){
        if(row.descripcion&&!e.target.value){
            setBandSave(true);
        }else{
            setBandSave(e.target.value);
        }

    }
  }

  const handleEdit = () => {
    const descripcion = document.getElementById(`${row.key}DESC`).value
    editFile(row.key,row.CTA,descripcion);
    setBandSave(false);
  }

  const handleDelete = () => {
    //const descripcion = document.getElementById(`${row.key}DESC`).value
    deleteFile(row.key,row.CTA,row.nombre,setDisabledRow,true);
  }

  const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
  });
 // const c = {base64: null}
  const selectFile = async () => {
    //  console.log("selectFile"+CTA);    
        /*ID = document.getElementById('ID').value
        nombre = document.getElementById('nombre').value
        folio = document.getElementById('folio').value
        descripcion = document.getElementById('descripcion').value
        const seccion = document.getElementById('seccion').value
        const asunto = document.getElementById('asunto').value
        const obs = document.getElementById('obs').value*/

        const file = document.querySelector('#file-input'+ID).files[0]
        const result = await toBase64(file).catch(e => e);
        document.getElementById("file-input"+ID).value=""
        
        if (result instanceof Error) {
        console.log('Error: ', result.message);
            return;
        }

        c.base64 = `${result}`
        document.getElementById('fileToUp'+ID).value = file.name;
        const uuid = uuidv4();
        //const {dataFiles} = c.state;
        //dataFiles.push({key: '',nombre: file.name, descripcion: '', opciones: ''});
       // c.state.dataFiles.push({key: '',ID,folio, nombre: file.name, descripcion, seccion, asunto, obs, opciones: '', uuid});
        c.setState({bandFS: true});
        //c.state.dataFiles.push({key: '',nombre: file.name, descripcion: '', opciones: ''});
        // document.getElementById('doc'+CTA).innerHTML = file.name
        //c.bandUpTramite = false;
        c.showNotification('trBO','CARGANDO... 0 %');
        //c.serialScan=Math.random()+""
        //c.serialScan='0'
        const docN = document.getElementById((ID+"DOCN"))
        docN.innerHTML=file.name
        upLoadDG(uuid,c,3131,false, 0, {band: true, ID, nombre: file.name});
        //noDisabled()
        //c.updateNB()
  };

    if(disabledRow){
      return (<></>)
    } else {
      return (
        <TableRow  className={classes.tableBodyRow}>
          <TableCell className={classes.tableCell}
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
            //onMouseUp={(e)=>{genDate(row.cta,row.key[row.key.length-1],row.idOrden)}}
            >
            <div id={row.uuid?(row.uuid+"ID"):(row.key+"ID")} >{row.key}</div>
          </TableCell>
          <TableCell className={classes.tableCell} 
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
            //onMouseUp={(e)=>{genDate(row.cta,row.key[row.key.length-1],row.idOrden)}}
            >
            <div id={row.uuid?(row.uuid+"DOCN"):(row.key+"DOCN")} >{row.nombre}</div>
          </TableCell>
          <TableCell className={classes.tableCell}
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
            //onMouseUp={(e)=>{genDate(row.cta,row.key[row.key.length-1],row.idOrden)}}
            >
          {/*<Input id={row.uuid?(row.uuid+"DESC"):(row.key+"DESC")} type='textarea' onMouseDown={(e)=>{e.target.style.borderColor='green'}}
            onBlur={(e)=>{e.target.style.borderColor='gray'}} onKeyUp={keyUpHandle}  defaultValue={row.descripcion} />*/}
            {row.folio}
          </TableCell>
          <TableCell className={classes.tableCell}
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
          >
            {row.descripcion}
          </TableCell>
          <TableCell className={classes.tableCell}
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
          >
            {row.seccion}
          </TableCell>
          <TableCell className={classes.tableCell}
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
          >
            {row.asunto}
          </TableCell>
          <TableCell className={classes.tableCell}
            onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
            //onMouseUp={(e)=>{genDate(row.cta,row.key[row.key.length-1],row.idOrden)}}
          >
            <input id={"file-input"+(row.uuid?(row.uuid):(row.key))} type="file" onChange={selectFile} name="avatar" style={{display: 'none'}} />
            <input id={"fileToUp"+(row.uuid?(row.uuid):(row.key))} type="hidden"  style={{border: 'none', textAlign: 'center', color: 'red'}} disabled />
            <Zoom
              //key={fab.color}
              in={true}
              onClick={()=>{
                //  CTA=row.key
                  ID=(row.uuid?(row.uuid):(row.key))
                  nombre = row.nombre
                  document.getElementById('file-input'+(row.uuid?(row.uuid):(row.key))).click()
              }}
              
              timeout={transitionDuration}
              style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
              }}
              unmountOnExit
            >
              
              <Fab color='default' style={{backgroundColor: 'green', color:'white'}}  aria-label="add">
                <Update/>
              </Fab>
              
            </Zoom>
              
            <Zoom
              //key={fab.color}
              in={true}
              onClick={()=>{
                const uuid=row.uuid;
                //const CTA=document.getElementById(uuid?(uuid+"ID"):(row.CTA+"ID")).innerHTML
                getD(uuid,row.CTA,row.key);
              }}
              timeout={transitionDuration}
              style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
              }}
              unmountOnExit
            >
              
              <Fab color='primary' aria-label="add">
              
                          <FindInPage />
              </Fab>            
            </Zoom>
                        
              <Zoom
              //key={fab.color}
              in={true}
              onClick={()=>{
                const uuid=row.uuid;
                getD(uuid,row.CTA,row.key,true);
              }}
              
              
              timeout={transitionDuration}
              style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
              }}
              unmountOnExit
            >
              
              <Fab color='primary' aria-label="add">
                          <Download />
              </Fab>
              </Zoom>
              
              <Zoom
              //key={fab.color}
              in={true}
              onClick={handleDelete}
              
              timeout={transitionDuration}
              style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
              }}
              unmountOnExit
              
            >
              
              <Fab style={{backgroundColor: 'red', color:'white'}} aria-label="add">
                          <Delete />
              </Fab>
              </Zoom>

              <Zoom
              //key={fab.color}
              in={bandSave}
              onClick={handleEdit}
              
              timeout={transitionDuration}
              style={{
                transitionDelay: `${transitionDuration.exit}ms`,
                opacity: 1
              }}
              unmountOnExit
              style={{ color:'white', backgroundColor: 'green',}}
            >
              
              <Fab aria-label="add">
                          <SaveIcon />
              </Fab>
              </Zoom>
            
          </TableCell>
          
        </TableRow>
      )
        }
}