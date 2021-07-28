import React from "react";
import ReactDOM from 'react-dom';
import {
  PDFViewer,
  Page,
  Text,
  Document,
  Font,
  StyleSheet,
  View,
  Image
} from "@react-pdf/renderer";
import ip from 'variables/ip';
import { MobilePDFReader } from "react-read-pdf";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import LogoI from "assets/img/default-avatar.png";
/*import LogoC from "../Icons/LOGOI.jpeg";
import marca from "../Icons/marcagua.png";
import LogoD from "../Icons/LOGOD.jpeg";
import cintillo from "../../assets/img/cintillo.jpeg";*/
import RobI from "../Typography/Roboto-Italic.ttf";
import RobB from "../Typography/Roboto-Bold.ttf";
import RobBI from "../Typography/Roboto-BoldItalic.ttf";
import CustomInput from "components/CustomInput/CustomInput";
import spellNumber from "views/Dashboard/spellNumber";
//import Calendar from "react-calendar";
import {Calendar} from "views/calendar"
import {addComi, editComi} from "./methods"
//import WN from "@material-ui/icons/Warning"
import UpLoadForm from "./upLoadForm";
import NotificationAlert from "react-notification-alert";
import TableFiles from "components/Table/TableFiles"

Font.register({
  family: 'Roboto',
  fonts: [{
    src: RobI,
    fontStyle: 'italic',
    fontWeight: 50
  }, {
    src: RobB,
    fontWeight: 'bold'
  }, {
    src: RobBI,
    fontStyle: 'italic',
    fontWeight: 'bold'
  }]
  
});

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
     CTA: props.CTA,
     nombre: props.nombre,
     sexo: props.sexo,
     edad: props.edad,
     localidad: props.localidad,
     ubi: props.ubi,
     telefono: props.telefono,
     cargo: props.cargo,
     obs: props.obs,
     monto: 0,
     bandSucces: false,
     bandFS:false,
     setMsg: props.setMsg,
     setColor: props.setColor,
     bandEdit: props.bandEdit,
     fechaN: props.fechaN?props.fechaN:'',
     fechaE: props.fechaE?props.fechaE:'',
     labelW: '',
    tr: false,
    colorSnack: 0,
    iconSnack: 0,
    placeSnack: 'tr',
     height: '50px',
     dataFiles: []
    }
    
  }
  countA = 0
  handdleUp=()=>{
    try{
    const nombre = document.getElementById("nombre").value;
    const sexo = document.getElementById("sexo").value;
    const edad = document.getElementById("edad").value;
    //const telefono = document.getElementById("telefono").value;
    const localidad = document.getElementById("localidad").value;
    const cargo = document.getElementById("cargo").value;
    const telefono = document.getElementById("telefono").value;
    const obs = document.getElementById("obs").value;
    const fileName = document.getElementById("fileToUp").value;
    //const {idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago} = this.state;
    const {bandEdit,fechaN,fechaE} = this.state
    console.log(bandEdit)
    if(nombre&&localidad){
      
      if(!bandEdit){
        addComi(this,nombre,sexo,edad,localidad,telefono,cargo, fechaN, fechaE, obs, fileName);
      }else{
        editComi(this,nombre,sexo,edad,localidad,telefono,cargo, fechaN, fechaE, obs, fileName);
        //editCliente(this,nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago);
      }
    }
  }catch(e){
    console.log(e)
  }
  }

  handleUpper = e => {
    try{
    console.log(e.target.id)
    if(e.target.id==="cta"){
      const v = e.target.value;
      if(v){
        this.allClientes(v);
      }
    }else{
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }else if(e.which===13){
      this.handdleUp()
    }
  }
  }catch(e){
    
  }
  }

  allClientes=async(comi)=>{
    try {

       //const sendUri = "http://34.66.54.10:3015/";
       //const GenExpHTML = GenExpHTML
       const sendUri = `${ip("2000")}comisarios/get`;
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         comi,
         tipoB: 0
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
              console.log(`Response1:`)
              console.log(r)
            let data = [];
            if (r.comisarios) {
             r.comisarios.forEach(e => {
                //setNombre(e.cliente);
                //setTelefono(e.telefono);
               //setUbi(e.ubi);
               const nombre = document.getElementById("nombre");
               const sexo = document.getElementById("sexo");
               const edad = document.getElementById("edad");
               const telefono = document.getElementById("telefono");
               const localidad = document.getElementById("localidad");
               const cargo = document.getElementById("cargo");
               const obs = document.getElementById("obs");
               
               nombre.value=e.nombre;
               sexo.value=e.sexo;
               edad.value=e.edad;
               telefono.value=e.telefono;
               localidad.value=e.localidad;
               cargo.value=e.cargo;
               obs.value=e.obs;
               
               
               this.setState({CTA: e.key, nombre: e.nombre,sexo: e.sexo, edad: e.edad, telefono: e.telefono,
                 localidad: e.localidad, cargo: e.cargo, obs: e.obs, fechaN: new Date(e.fechaN), fechaE: new Date(e.fechaE)});
                const doc = document.getElementById("fileToUp");
                doc.value=e.documento?e.documento:''
                this.getFiles('');
                 /*data.push({
                  key: e.idCliente,
                  cliente: e.cliente,
                  telefono: e.telefono,
                  ubi: e.ubi,
                  fechaPago: null,
                  fechaDePago:  e.ultimoRecibo?e.ultimoRecibo.fechaPago:e.ultimoRecibo,
                  monto: null,
                  montor: e.ultimoRecibo?e.ultimoRecibo.monto:e.ultimoRecibo,
                  idVelocidad: e.ultimoRecibo?e.ultimoRecibo.idVelocidad:e.ultimoRecibo,
                  velocidad: e.ultimoRecibo?e.ultimoRecibo.velocidad:e.ultimoRecibo,
                  expiro: e.expiro,
                  refRow: React.createRef(),
                  dateSI:  e.ultimoRecibo?e.ultimoRecibo.dateI:e.ultimoRecibo,
                  dateSF:  e.ultimoRecibo?e.ultimoRecibo.dateF:e.ultimoRecibo,
                  difDate:  e.ultimoRecibo?e.ultimoRecibo.difDate:e.ultimoRecibo,
                  idRecibo:  e.ultimoRecibo?e.ultimoRecibo.idRecibo:e.ultimoRecibo,
                  
                });
                console.log(data) 
                if(e.expiro){
                  this.expiro=1;
                  data[data.length-1].fechaPago=<div  >
                  <GenExpHTML c={this} refRow={data[data.length-1].refRow}  /> 
                  <i style={{color: 'red'}} >{data[data.length-1].fechaDePago}</i>
                  </div>
                  data[data.length-1].monto=<><i style={{color: 'red'}} >{data[data.length-1].montor}</i></>
                //  data[data.length-1].velocidad=<i style={{color: 'red'}} >{data[data.length-1].velocidad}</i>
                }*/

             })

            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

getFiles=async(comi)=>{
    try {
      const {CTA} = this.state
       //const sendUri = "http://34.66.54.10:3015/";
       //const GenExpHTML = GenExpHTML
       const sendUri = `${ip("2000")}comisarios/get`;
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         comi,
         tipoB: 0,
         CTA,
         opG: 'file'
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
            if (r.documentos) {
              this.setState({dataFiles: r.documentos});
            }
            
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

setTotal=(t,idV,v)=>{
    let {difDate} = this.state
    difDate = difDate==="undefined"?1:difDate
    console.log(`difDate: ${difDate}`)
    const monto = t * difDate
    
    console.log(monto)
    //c.setState({pagar})
    //console.log(difDate)
    this.setState({idVelocidad: idV,velocidad: v,monto})
}

componentDidMount(){
  const {bandEdit,CTA} = this.state
  
  if(bandEdit){
    this.allClientes(CTA);
  }
}

showNotification = (place,labelW,CTA) => {
  const {tr,tr2} = this.state
  let timeO = 6000;

  switch (place) {
      case "tr":
        //this.setState({placeSnack:'tr',colorSnack: 2, iconSnack: 0,bandNotify:true});
        this.notify(labelW,'tl',2,3,CTA);
      break;
      case "trE":
        this.setState({placeSnack:'tr',colorSnack: 'danger', iconSnack: Error,labelW});
      break;
      case "trA":
        //this.setState({placeSnack:'tr',colorSnack: 'success', iconSnack: CheckCircle, labelW: 'Orden registrada con éxito'});
      break;
      case "trB":
        //this.setState({placeSnack:'tr',colorSnack: 1, iconSnack: 0, labelW,bandNotify:true});
        this.notify(labelW,'tl',1,0,CTA);
        timeO = 256000
        //timeO = 6001
      //this.setState({tr: true})
      break; 
      case "trBO":
        console.log(labelW)
    //    this.setState({placeSnack:'tr',colorSnack: 1, iconSnack: 1, labelW,bandNotify:true});
        this.notify(labelW,'tl',5,1,CTA)
        timeO = -1
        //timeO = 6001
      //this.setState({tr: true})
      break;  
    default:
      break;
  }
};

notify = (label,place, color,icon,CTA) => {
    //var color = Math.floor(Math.random() * 5 + 2);
    //var color = 2
    try{
        var type;
        let snackBand = document.getElementById("snack"+CTA)
        switch (color) {
        case 1:
            type = "primary";
            break;
        case 2:
            type = "success";
            break;
        case 3:
            type = "danger";
            break;
        case 4:
            type = "warning";
            break;
        case 5:
            type = "info";
            break;
        default:
            break;
        }
        switch (icon) {
        case 0:
            icon = "icon-alert-circle-exc";
            break;
        case 1:
            icon = "icon-send";
            break;
        case 2:
            icon = "icon-upload";
            break;
        case 3:
            icon = "icon-check-2";
            break;
        case 4:
            icon = "info";
            break;
        default:
            break;
        }
        var options = {};
        options = {
        place: place,
        message: (
            <div>
            <div id={'snack'+CTA} >
                {label}
            </div>
            </div>
        ),
        type: type,
        icon: "tim-icons "+icon,
        autoDismiss: 0
        };
       // console.log(snackBand)
       // if(!snackBand){
          this.refs.notificationAlert.notificationAlert(options);
       // }
    }catch(e){
        console.log(e)
    }
  };


  render() {
    const {classes} = this.props
    const {CTA,nombre,sexo,edad,localidad,telefono, cargo,bandSucces,obs,bandEdit,height,dataFiles} = this.state
    const labelB = bandEdit?"ACTUALIZAR COMISARIO":"REGISTRAR COMISARIO";
    const headCells = [
    { id: 'key', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'descripcion', numeric: false, disablePadding: false, label: 'Descripcion' },
    { id: 'opciones', numeric: false, disablePadding: false, label: 'Opciones' }
    ]
    return (
      <CardIcon>
        <div style={{zIndex: 99999}} className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
        </div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
              <React.Fragment>
                  {bandEdit && <>
                  <GridContainer>
                    
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="NP:"
                        id="cta"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          //value: nombre,
                          defaultValue: CTA,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          onMouseUp: this.handleUpper,
                        }}
                      />
                    </GridItem>
                    </GridContainer>
                  </>}
                  <GridContainer>
                    
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                        labelText="NOMBRE:"
                        id="nombre"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: nombre,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}> 
                      <CustomInput
                        labelText="SEXO:"
                        id="sexo"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: sexo,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}> 
                      <CustomInput
                        labelText="EDAD:"
                        id="edad"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          //value: nombre,
                          defaultValue: edad,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={4}> 
                      <CustomInput
                        labelText="TELEFONO:"
                        id="telefono"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: telefono,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="LOCALIDAD:"
                        id="localidad"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: localidad,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="CARGO:"
                        id="cargo"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: cargo,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="OBSERVACIONES:"
                          id="obs"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text",
                            defaultValue: obs,
                            //onBlur: this.handdleU
                            onKeyUp: this.handleUpper,
                            //onMouseUp: this.handdleU
                          }}
                        />
                        </GridItem>
                    </GridContainer>
                    <div style={{height: 50}} />
                    
                    <GridContainer>
                    <Calendar c={this} bandRange={true} labelID={'fechaNacimiento'} classes={classes} />
                  
                    {/*<GridItem xs={12} sm={12} md={2}>
                      <h4 id="fechaEleccion" className={classes.cardTitleBlack}>
                          FECHA DE ELECCIÓN:
                      </h4>
                      
                       <Calendar c={this} bandRange={true} labelID={'fechaEleccion'} />
                  
                      </GridItem>*/}
                    </GridContainer>
                    <div style={{height: 50}} />
                    <GridContainer >
                      <GridItem xs={12} sm={12} md={4}></GridItem>
                    {(parseInt(CTA)>0) &&
                      <GridItem xs={12} sm={12} md={3}>
                      <div style={{textAlign: 'center'}} >
                        <h4  className={classes.cardTitleBlack}>
                            AGREGAR DOCUMENTO:
                        </h4>
                          <UpLoadForm c={this} />
                      </div>
                    </GridItem>}

                    </GridContainer>
                    {(parseInt(CTA)>0) &&
                      <GridContainer >
                      <TableFiles
                        c={this}
                        tableHeaderColor="info"
                        tableHead={headCells}
                        tableData={dataFiles}
                      />
                    </GridContainer>}
                    <div style={{height}} ></div>
                    <GridContainer>
                    <Button id='btnAddC' color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      disabled={bandSucces}
                      >
                        {labelB}
                      </Button>
                  </GridContainer>
                  
                    </React.Fragment>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </CardIcon>
    );
  }
}
export default App;