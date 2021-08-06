import ip from "variables/ip"
import {upLoadD} from "views/clientes/methods"
import { v4 as uuidv4 } from 'uuid';
export default async (c,nombre,sexo,edad,localidad,telefono,cargo, fechaN, fechaE, obs, fileName) => {
    try{
        c.setState({bandSucces: true});
    const {setMsg, setColor} = c.state
    const sendUri = `${ip("2000")}comisarios/addComi`;
    //const dateUp =  
    const bodyJSON = {
         CTA: c.state.CTA, nombre,sexo,edad,localidad,telefono,cargo, fechaN, fechaE, obs, fileName, bandEdit: true,
    }
    console.log(bodyJSON)
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
        setMsg("")
        setMsg(nombre+" Comisario de "+localidad+" se ha actualizado con éxito...")
        setColor("success")
        
        if(c.state.bandFS){
            c.showNotification('trBO','CARGANDO... 0 %',r.CTA);
            upLoadD(uuidv4(),r.CTA,c);
        }
        if(r.exito){
            c.setState({bandSucces: false});
        }
    });
    }catch(e){
        console.log(e)
    }
}