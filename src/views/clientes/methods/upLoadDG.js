import ip from "variables/ip.js";
import CheckCircle from "@material-ui/icons/CheckCircle"

const upLoadDG = async(uuid, c, port=3131, analize=false, npage=0, bandE)=>{
  const buffer = 64000
  try{
    console.log('upLoadDG')
    let ID = document.getElementById('ID').value;
    let nombre = document.getElementById('nombre').value;
    const folio = document.getElementById('folio').value;
    const descripcion = document.getElementById('descripcion').value;
    const seccion = document.getElementById('seccion').value;
    const asunto = document.getElementById('asunto').value;
    const obs = document.getElementById('obs').value;
    //const {ID,nombre,folio,descripcion,seccion,asunto,obs} = c.state
    const tp = '';
    let dataPart = '';
    let lengthE = c.base64.length;
    let pdfToUp = null;
  // const descripcion=document.getElementById(uuid+"DESC").value
    if(bandE&&bandE.band){
      ID=bandE.ID;
      nombre=bandE.nombre;
    }  

    try{
      pdfToUp = document.getElementById('pdfToUp'+ID);
    }catch(e){
      
    }

    if(!pdfToUp){
      pdfToUp = document.getElementById('fileToUp');
    }
    const sendUri = ip(port)+"comisarios/upLoadDG";

    if(c.countA<lengthE){
        
      let auxA = c.countA + buffer;
      while(auxA>c.countA&&c.base64.length>c.countA){
        dataPart+=c.base64[c.countA];
        c.countA++;
      }
      //c.setState({labelW: "CARGANDO... "+parseInt(c.countA/lengthE*100)+" %"});
      try{
        document.getElementById('snack').innerHTML=`CARGANDO PORFAVOR ESPERE  ${pdfToUp.value}... `+parseInt(c.countA/lengthE*100)+" %"
      }catch(e){
        console.log(e)
      }
      //c.showNotification('trBO',"CARGANDO... "+parseInt(c.countA/lengthE*100)+" %");
    // regP.innerHTML = "Cargando... "+parseInt(c.countA/lengthE*100)+" %"
    }

    const bodyJSON = {
      op: 1,
      uuid,
      ID,
      nombre,
      folio,
      seccion,
      asunto,
      obs,
      tp,
      dataPart,
      lengthE,
      count: c.countA,
      fileName: pdfToUp.value?pdfToUp.value:nombre,
      descripcion,
      port,
      analize,
      npage
    }

    //console.log(`bodyJSON ${bodyJSON}`)
    console.log(bodyJSON)
    //console.log(c.base64)
    
    const response = await fetch(sendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJSON)
    });
    const responseJson = await response.json().then(r => {
        //console.log(`Response1: ${r}`)
  //console.log(bodyJSON);
        if (r.next) { 
          upLoadDG(uuid,c,port,analize,npage,bandE);
        }else if(r.nextNode){
          //console.log(r.currentCTA)
          c.countA=0;
          //c.serialScan = (parseInt(c.serialScan)+1)+"";
          upLoadDG(uuid,c,port,analize,npage,bandE);
        }else if(r.next===0){
          //regP.innerHTML = " ANALIZANDO... " + parseInt(this.countA/lengthE*100)+" % "
          //regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(c.countA/lengthE*100)+" % "
          c.setState({labelW: "ANALIZANDO... 0.0 % "});
          c.setState({opSnack: true});

          const uuID = document.getElementById(uuid+"ID");
          if(uuID){
            uuID.innerHTML=r.idDoc;
          }
        //  document.getElementById("analizeBtn").innerHTML=" ANALIZANDO... 0 % "
          //document.getElementById("snackAnaL").style.opacity=1
        //  c.setState({opSnack: true})

        // upLoadD(CTA,c,port,true)
          upLoadDG(uuid,c,port,true,npage,bandE);
        }else if(r.analising){
          c.setState({labelW: `ANALIZANDO... ${r.p}, hoja ${r.npage} de ${r.lengthP}`});
        // document.getElementById("analizeBtn").innerHTML=`ANALIZANDO... ${r.p}, hoja ${r.npage} de ${r.lengthP}`
          //upLoadD(CTA,c,port,true,r.npage)
          upLoadDG(uuid,c,port,true,r.npage,bandE);
        }else if(r.analize){
        // c.setUnPort(port);
          c.setState({iconTo: CheckCircle, colorSnack: 0, topAna: 5, bandFS: false});
        // regP.innerHTML = "- CARGA COMPLETADA - " + parseInt(c.countA/lengthE*100)+" % "
          //document.getElementById("analizeBtn").innerHTML=r.p
          c.countA=0
          c.showNotification("trA")
          //document.getElementById(uuid).innerHTML=CTA;
          try{
            //document.getElementById('snack'+CTA).innerHTML=`- CARGA COMPLETADA - ${pdfToUp.value}... `
            c.showNotification('tr',`- CARGA COMPLETADA - ${pdfToUp.value}... `,ID);
          }catch(e){
        
          }
          //c.idOrden = 0
          /*if (r.bg>0){
            c.setBg()
          }*/
                
        // console.log(r.bg)
          /*
          if(r.S&&r.S!==null&&r.S!==undefined&&r.S!==""&&r.S!=="undefined"){
            r.S=r.S.split(" ").join("")
            if(r.S!==""){
              document.getElementById("m1").value=r.S
              //document.getElementById("Sm1").innerHTML="*  Terreno: "+r.S+" m²"
            }
          }else{
            document.getElementById("Sm1").value=""
          }*/
        }

    });  
  }catch(e){
    console.log(e);
    c.countA -= (buffer-1);
  //  c.serialScan = (parseInt(c.serialScan)+1)+"";
    upLoadDG(uuid,c,port,analize,npage,bandE);
  }
}
export default upLoadDG