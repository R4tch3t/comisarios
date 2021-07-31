import ip from "variables/ip"
//import {upLoadD} from "views/clientes/methods"
//import { v4 as uuidv4 } from 'uuid';
export default async (c,idDoc,nombre,folio,descripcion,seccion,asunto) => {
    try{
        
        c.setState({bandSucces: true});
        const {setMsg, setColor} = c.state
        const sendUri = `${ip("2000")}comisarios/editFile`;
        //const dateUp =  
        const bodyJSON = {
            CTA: true,
            bandEdit:'editG',
            idDoc, 
            nombre,
            folio,
            descripcion,
            seccion,
            asunto 
        }

        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });
    
        const responseJson = await response.json().then(r => {
            //alert(r.exito)
            /*setMsg("")
            setMsg(nombre+" se ha actualizado con éxito...")
            setColor("success")*/
            //c.showNotification('trBO',nombre+" se ha actualizado con éxito...");
            c.getFiles(0,idDoc);
            c.showNotification('tr',nombre+" con ID "+idDoc+" se ha actualizado con éxito...");
            if(r.exito){
            //   c.setState({bandSucces: false});
            }
        });
    }catch(e){
        console.log(e)
    }
}