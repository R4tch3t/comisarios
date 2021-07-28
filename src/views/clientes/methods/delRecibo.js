import ip from "variables/ip"
import decrypt from "views/Dashboard/decrypt.js";
import encrypt from "views/Dashboard/encrypt.js";
const genCTA = (idCliente, nombre, ubi, fecha, monto, velocidad, idVelocidad, dateSI, dateSF, difDate, expiro) => {
    //const idRol = cookie.load('idRol')
    const idRol = "1";
    let url = idRol === '1' ? `/admin/listaComisarios` : `/usuario/listaComisarios`
    let subUrl = `?bandCTA=1&idCliente=${idCliente}&nombre=${nombre}&ubi=${ubi}&fecha=${fecha}&dateSI=${dateSI}&dateSF=${dateSF}&monto=${monto}&idVelocidad=${idVelocidad}&velocidad=${velocidad}&difDate=${difDate}&expiro=${expiro}&pagar=0`
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
export default async (c) => {
    try{
    const {idRecibo,idCliente, setMsg, setColor} = c.state
    const sendUri = `${ip("2000")}clientes/delRecibo`;
    const bodyJSON = {
          idRecibo,idCliente
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
        setMsg("El Pago se eliminó con éxito...")
        setColor("danger")
            if(r.adeuda){
                c.setState({bandGen: false,expiro: "1"});
            }else{
                c.setState({bandGen: false,expiro: "u"});
            }
    });
    }catch(e){
        console.log(e)
    }
}