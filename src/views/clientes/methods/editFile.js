import ip from "variables/ip"
import {upLoadD} from "views/clientes/methods"
import { v4 as uuidv4 } from 'uuid';
export default async (idDoc,CTA,descripcion) => {
    try{
    const sendUri = `${ip("2000")}comisarios/editFile`;
    //const dateUp =  
    const bodyJSON = {
        bandEdit:true,
        idDoc, 
        CTA,
        descripcion 
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
        
        if(r.exito){
         //   c.setState({bandSucces: false});
        }
    });
    }catch(e){
        console.log(e)
    }
}