import React from "react";
import {
  Font,
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
import {addComi, editComi} from "views/clientes/methods"
//import WN from "@material-ui/icons/Warning"
import UpLoadForm from "./upLoadForm";
import SearchB from "./searchB";
import UpdateB from "./updateB";
import NotificationAlert from "react-notification-alert";
import TableFiles from "components/Table/TableFilesG"

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
     ID: props.ID,
     nombre: props.nombre,
     folio: props.folio,
     descripcion: props.descripcion,
     seccion: props.seccion,
     asunto: props.asunto,
     obs: props.obs,
     bandSucces: true,
     bandFS:false,
     setMsg: props.setMsg,
     setColor: props.setColor,
     bandEdit: props.bandEdit,
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
  /*handdleUp=()=>{
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
  }*/

handleUpper = e => {
    try{
      console.log(e.target.id)
      console.log(e.which)
      if(e.which===9){
        return false;
      }
      /*if(e.target.id==="cta"){
        const v = e.target.value;
        if(v){
          this.allClientes(v);
        }
      }else{*/
        if(e.target.id==="ID"){
          this.getFiles(0,e.target.value);
        }

        if(e.target.value===""){
          return false
        }

        if(e.target.id==="nombre"){
          const id = document.getElementById("ID").value;
          //if(!id){
            this.getFiles(1,e.target.value);
          //}
        }

        if(e.target.id==="folio"){
          this.getFiles(2,e.target.value);
        }

        if(e.target.id==="descripcion"){
          this.getFiles(3,e.target.value);
        }

        if(e.target.id==="seccion"){
          this.getFiles(4,e.target.value);
        }

        if(e.target.id==="asunto"){
          this.getFiles(5,e.target.value);
        }

        if ((e.which === 32 || e.which > 39)&&e.target.id!=="nombre") {
          
            this.selectionStartNombre = e.target.selectionStart
            this.selectionEndNombre = e.target.selectionEnd
            e.target.value = e.target.value.toUpperCase()
            e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
          
        }else if(e.which===13){
          //this.handdleUp()
        }

      //}
    }catch(e){
    
    }
}

getFiles=async(tipoB,v)=>{
try {
  const {CTA} = this.state
  
    //const sendUri = "http://34.66.54.10:3015/";
    //const GenExpHTML = GenExpHTML
    const sendUri = `${ip("2000")}comisarios/get`;
    // const sendUri = "http://localhost:3015/";
    //const sendUri = "http://192.168.1.74:3015/";
    const bodyJSON = {
      v,
      tipoB,
      CTA,
      opG: 'fileG'
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
          if(tipoB===0&&v){
            const d = r.documentos[0];
            //this.setState({bandSucces: false});
            const nombre = d.nombre
            const folio = d.folio
            const descripcion = d.descripcion
            const seccion = d.seccion
            const asunto = d.asunto
            const obs = d.obs
            
            /*const nombre = document.getElementById("nombre")
            const folio = document.getElementById("folio")
            const descripcion = document.getElementById("descripcion")
            const seccion = document.getElementById("seccion")
            const asunto = document.getElementById("asunto")
            nombre.value=d.nombre
            folio.value=d.folio
            descripcion.value=d.descripcion
            seccion.value=d.seccion
            asunto.value=d.asunto*/
            
            this.setState({ID: v,nombre,folio,descripcion,seccion,asunto,bandSucces: false,obs});

          }else if(!v){
            document.getElementById("nombre").value=""
            document.getElementById("folio").value=""
            document.getElementById("descripcion").value=""
            document.getElementById("seccion").value=""
            document.getElementById("asunto").value=""
            document.getElementById("obs").value=""
          }
          this.setState({dataFiles: r.documentos, bandSucces: true});
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
  const {ID} = this.state
  if(parseInt(ID)){
    this.getFiles(0,ID);
  }else{
    this.getFiles();
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
            <div id={'snack'} >
                {label}
            </div>
            </div>
        ),
        type: type,
        icon: "tim-icons "+icon,
        autoDismiss: 3
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
    const {ID,nombre,folio,descripcion,seccion,asunto,bandSucces,obs,bandEdit,height,dataFiles} = this.state
    const labelB = bandEdit?"ACTUALIZAR COMISARIO":"REGISTRAR COMISARIO";
    const headCells = [
    { id: 'key', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'folio', numeric: false, disablePadding: false, label: 'Folio' },
    { id: 'descripcion', numeric: false, disablePadding: false, label: 'Descripcion' },
    { id: 'seccion', numeric: false, disablePadding: false, label: 'Seccion' },
    { id: 'asunto', numeric: false, disablePadding: false, label: 'Asunto' },
    //{ id: 'obs', numeric: false, disablePadding: false, label: 'Observaciones' },
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
                  <GridContainer>
                    
                  <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                        labelText="ID:"
                        id="ID"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          //value: nombre,
                          defaultValue: ID,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          onMouseUp: this.handleUpper,
                        }}
                      />
                    </GridItem>
                    </GridContainer>
                {bandSucces && <>   
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
                        labelText="FOLIO:"
                        id="folio"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: folio,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}> 
                      <CustomInput
                        labelText="DESCRIPCION:"
                        id="descripcion"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: descripcion,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={4}> 
                      <CustomInput
                        labelText="SECCIÓN:"
                        id="seccion"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          //value: nombre,
                          defaultValue: seccion,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="ASUNTO:"
                        id="asunto"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: asunto,
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
                    <GridContainer >
                      <GridItem xs={12} sm={12} md={4}>
                        <div style={{textAlign: 'center'}} >
                          <h4  className={classes.cardTitleBlack}>
                              BUSCAR ARCHIVO:
                          </h4>
                          <SearchB c={this} />
                        </div>
                      </GridItem>
                    
                    <GridItem xs={12} sm={12} md={3}>
                      <div style={{textAlign: 'center'}} >
                        <h4  className={classes.cardTitleBlack}>
                            AGREGAR DOCUMENTO:
                        </h4>
                          <UpLoadForm c={this} />
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                        <div style={{textAlign: 'center'}} >
                          <h4  className={classes.cardTitleBlack}>
                              ACTUALIZAR ARCHIVO:
                          </h4>
                          <UpdateB c={this} />
                        </div>
                    </GridItem>

                    </GridContainer>
                    
                      <GridContainer >
                      <TableFiles
                        c={this}
                        tableHeaderColor="info"
                        tableHead={headCells}
                        tableData={dataFiles}
                      />
                    </GridContainer>

                    <div style={{height}} ></div>
                    <GridContainer>
                    {/*<Button id='btnAddC' color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      disabled={bandSucces}
                      >
                        {labelB}
                    </Button>*/}
                  </GridContainer>
                </>
                }          
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