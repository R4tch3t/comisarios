import ip from "variables/ip"
export default async (idDoc,CTA,nombre,setDisabledRow,bandG) => {
    try{
    const sendUri = `${ip("2000")}comisarios/editFile`;
    //const dateUp =  
    const bodyJSON = {
        idDoc,
        CTA,
        nombre
    }
    
    if(bandG){
        bodyJSON.bandEdit="delG"
        bodyJSON.CTA=1
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
        setDisabledRow(true);
        if(r.exito){
         //   c.setState({bandSucces: false});
        }
    });
    }catch(e){
        console.log(e)
    }
}