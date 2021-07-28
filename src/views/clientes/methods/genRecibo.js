import ip from "variables/ip"
import decrypt from "views/Dashboard/decrypt.js";
import encrypt from "views/Dashboard/encrypt.js";
const genCTA = (idCliente, nombre, ubi, fecha, monto, velocidad, idVelocidad, dateSI, dateSF, difDate, expiro,idRecibo) => {
    //const idRol = cookie.load('idRol')
    const idRol = "1";
    let url = idRol === '1' ? `/admin/listaComisarios` : `/usuario/listaComisarios`
    let subUrl = `?bandCTA=1&idCliente=${idCliente}&nombre=${nombre}&ubi=${ubi}&fecha=${fecha}&dateSI=${dateSI}&dateSF=${dateSF}&monto=${monto}&idVelocidad=${idVelocidad}&velocidad=${velocidad}&difDate=${difDate}&expiro=${expiro}&pagar=0&idRecibo=${idRecibo}&isUpdated=1`
    console.log(subUrl)
    url += `?v=${encrypt(subUrl)}`;
    //window.history.pushState(null,'Administrador','#/admin/creditos')
      //       window.history.go()
    const win = window.open(url,"_self");
    win.focus();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default async (c, nombre, ubi, monto, fechaPago, fechaSI, fechaSF) => {
    try{
    const {idCliente,difDate, velocidad, idVelocidad} = c.state
    const sendUri = `${ip("2000")}clientes/genRecibo`;
    /*const dateA = new Date(fechaSI)
    const dateB = new Date(fechaSF)
    let difDate = 0;
    while(dateA<dateB){
        dateA.setMonth(dateA.getMonth()+1)
        difDate++
    }*/
    
    console.log(difDate)
    console.log("cDate: "+difDate)
    // if()
    //difDate = (new Date(fechaSI).getMonth()+1) - (difDate.getMonth()+1)
      
    const bodyJSON = {
          idCliente,
          ubi,
          monto,
          fechaPago, 
          dateI: fechaSI,
          dateF: fechaSF,
          difDate,
          idVelocidad 
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
        console.log(r)
            if(r.exito){
               // c.setState({nombre, ubi, pagar:monto,fechaPago, fechaSI, fechaSF,expiro:false});
                let urlDec = getParameterByName('v');
                urlDec = decrypt(urlDec);
                //const velocidad = getParameterByName('velocidad', urlDec)
                //const idVelocidad = getParameterByName('idVelocidad', urlDec)
                //const difDate = getParameterByName('difDate', urlDec)
                const idRecibo = r.clientes.insertId;
                genCTA(idCliente, nombre, ubi, fechaPago, monto, velocidad, idVelocidad, fechaSI, fechaSF, difDate, 0,idRecibo)
            }
    });
    }catch(e){
        console.log(e)
    }
}