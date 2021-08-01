import React from 'react';
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import {isMobile} from "react-device-detect"; 
import Lock from "@material-ui/icons/Lock";
import Settings from "@material-ui/icons/Settings";
import {Fab} from "views/fab"
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js"; 
import TableComisarios from "components/Table/TableComisarios.js";
import classNames from "classnames";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
//import Card from "components/Card/Card.js";
//import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
//import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import Poppers from "@material-ui/core/Popper";
import ip from 'variables/ip';
import GenExpHTML from "./GenExpHTML"
import WN from "@material-ui/icons/Warning"
import { Line, Bar } from "react-chartjs-2";
import Switch from '@material-ui/core/Switch';
import {Zoom} from "views/zoom"
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import Remove from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import NotificationAlert from "react-notification-alert";
//import NotiStack from "./notiStack"


export default class TableRender extends React.Component {

constructor(props){
    super(props);
    this.state = {
        dataTable: [],
        classes: props.classes,
        classesM: props.classesM,
        openDash: null,
        setOpenDash: null,
        labelB: 'NOMBRE',
        openExpireDash: null,
        opExp: 0.2,
        IconLock: Lock ,
        bandTrash: true,
        labelW: '',
        labelW2: '',
        tr: false,
        tr2: false,
        colorSnack: 0,
        colorSnack2: 'warning',
        iconSnack: 0,
        iconSnack2: WN,
        placeSnack: 'tr',
        placeSnack2: 'tc',
        bandLoad: true,
        notiStack: [],
        bandNotify: false
    };
    
}
deleteStack = {};
refSwitch=null;
bandLock = true;
tipoB = 1
expiro = 0;
base64 = null;
countA=0;

handleCloseDash = () => {
 // setOpenDash(null);
 //const {setOpenDash} = this.state
 this.setState({openDash: null})
};

handleCloseExpireDash = () => {
 // setOpenDash(null);
 //const {setOpenDash} = this.state
 this.setState({openExpireDash: null})
};

round = (num, decimales = 2)=>{
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;
  if (decimales === 0) //con 0 decimales
    return signo * Math.round(num);
  // round(x * 10 ^ decimales)
  num = num.toString().split('e');
  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  // x * 10 ^ (-decimales)
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

deleteCliente = async (idCliente) => {
  let band = true;
  let c = 0;
  const rC = Object.keys(this.deleteStack).map((key) => [Number(key), this.deleteStack[key]]);
  /*while(band){
    if(c<rC.length){
      this.sleep(300);
    }else{
      band=false
    }*/
    try{
      const sendUri = `${ip("2000")}clientes/deleteCliente`;
       // const sendUri = "http://localhost:3015/";
        //const sendUri = "http://192.168.1.74:3015/";
       const bodyJSON = {
         idClientes: rC,
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
          console.log(r)
          if(r.exito){

          }
        //  c++;
        });
    }catch(e){

    }
  //}
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
         tipoB: this.tipoB
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
              
            if (r.comisarios) {
              /*r.clientes.forEach(e => {
                data.push({
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
                }

             })*/
             this.setState({dataTable: r.comisarios});
            }
            
           // this.setState({dataTable: data});
            /*else if (r.error.name === "error01") {
                       this.removeCookies()
                       confirmAlert({
                         title: "¡Error!",
                         message: "La contraseña es incorrecta.",
                         buttons: [{
                           label: "Aceptar",
                           onClick: () => {
                             this.props.history.push("/entrar");
                           }
                         }]
                       });
                     }*/
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

editClientes = () => {
  Object.keys(this.deleteStack).map((key) => {
    //[Number(key), this.deleteStack[key]]
    const idRol = "1";
    //const url = idRol === '1' ? `/admin/editarCliente/${key}` : `/usuario/editarCliente/${key}`;
    const url = `/comisarios/editar/${key}`;
    const win = window.open(url, '_blank');
    win.focus();
  });
}

getParameterByName=(name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


changeDash = event => {
  const {openDash} = this.state;
  if (openDash && openDash.contains(event.target) ) {
    //setOpenDash(null);
    this.setState({openDash: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openDash: event.currentTarget});
  }
}

handleClickDash = event => {
  this.changeDash(event);
};

changeExpireDash = event => {
  const {openExpireDash} = this.state;
  if (openExpireDash && openExpireDash.contains(event.target) ) {
    //setOpenDash(null);
    this.setState({openExpireDash: null});
  } else {
    //setOpenDash(event.currentTarget);
    this.setState({openExpireDash: event.currentTarget});
  }
}

handleClickExpireDash = event => {
  console.log("clickExpireDash")
  this.setState({opExp: 1})
  //this.changeExpireDash(event);
};

selectionStartNombre = null
selectionEndNombre = null
handleUpper = e => {
  if(!isMobile){
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }
  }
  //if (e.target.value === '') {
    this.allClientes(e.target.value)
  //}
}



buscarCTA = (key) => (event) => {
  const CTAnombre = document.getElementById('CTANM').value;
  //const checkU = document.getElementById('check0');
  this.tipoB = key
  let labelB = 0 //key===0?'ID':'NOMBRE'
  switch(key){
    /*case 0: {
      labelB = 'ID';
      break;
    }*/
    case 1:{
      labelB = 'NOMBRE';
      break;
    }
    case 2:{
      labelB = 'LOCALIDAD';
      break;
    }
  }
  this.setState({labelB})
  //if (CTAnombre !== '') {
  this.allClientes(CTAnombre)    
 // }
}


componentDidMount(){
  this.allClientes('')
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
  const {
    dataTable,
    classes,
    classesM,
    openDash,
    labelB,
    IconLock,
    colorSnack,
    iconSnack,
    labelW,
    bandNotify,
    bandTrash
  } = this.state;
  
  const headCells = [
    { id: 'key', numeric: false, disablePadding: true, label: 'NP' },
    { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
    { id: 'sexo', numeric: false, disablePadding: false, label: 'Sexo' },
    { id: 'edad', numeric: false, disablePadding: false, label: 'Edad' },
    { id: 'telefono', numeric: false, disablePadding: false, label: 'Telefono' },
    { id: 'localidad', numeric: false, disablePadding: true, label: 'Localidad' },
    { id: 'cargo', numeric: false, disablePadding: false, label: 'Cargo' },
    { id: 'fechaN', numeric: false, disablePadding: false, label: 'Fecha de nacimiento' }, 
    { id: 'fechaE', numeric: false, disablePadding: false, label: 'Fecha de elección' },
    { id: 'obs', numeric: false, disablePadding: false, label: 'Observaciones' },
    //{ id: 'documento', numeric: false, disablePadding: false, label: 'Documento' },
  //  { id: 'cargo1', numeric: true, disablePadding: false, label: 'Opciones' },
    //{ id: 'cargo2', numeric: false, disablePadding: false, label: '2do. Cargo' },
   // { id: 'construccion', numeric: true, disablePadding: false, label: 'Construccion' },
  ]
  return (
   <>
        <div className="content">
          {/*bandNotify&&<NotiStack label={labelW} bandS={true} place={'tl'} color={colorSnack} icon={iconSnack} />*/}
        <div style={{zIndex: 99999}} className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
        </div>
      
   <Row>
            <Col xs="12">
              <Card>
               
                <CardBody>
                  <div >
                     <CustomInput
                      formControlProps={{
                        className: classes.margin + " " + classes.search
                      }}
                      id="CTANM"
                      inputProps={{
                        placeholder: labelB,
                        type: "text",
                        onKeyUp: this.handleUpper,
                        onMouseUp: this.handleUpper,
                        //value: idUsuario,

                        inputProps: {
                          "aria-label": "Search"
                        }
                      }}
                    />
                    <Button
                      color="white"
                      onMouseEnter={(e)=>{this.setState({openDash: e.currentTarget});}}
                      onMouseUp={this.handleClickDash}
                      aria-label="edit"
                      aria-owns={openDash ? "profile-menu-list-grow" : null}
                      aria-haspopup="true"
                      justIcon
                      round
                    >
                      <Search />
                    </Button>
                    <Poppers
                      open={Boolean(openDash)}
                      anchorEl={openDash}
                      transition
                      disablePortal
                      className={
                        classNames({ [classesM.popperClose]: !openDash }) +
                        " " +
                        classesM.popperNav
                      }
                      style={{ zIndex: 9999 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="profile-menu-list-grow"
                          style={{
                            transformOrigin:
                              placement === "bottom" ? "center top" : "center bottom"
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={this.handleCloseDash}>
                              <MenuList role="menu">
                                <MenuItem
                                  key={"cuenta"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(0)}
                                >
                                  Por ID.
                                </MenuItem>
                                <MenuItem
                                  key={"nombre"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(1)}
                                >
                                  Por nombre
                                </MenuItem>
                                <MenuItem
                                  key={"localidad"}
                                  className={classesM.dropdownItem}
                                  onClick={this.buscarCTA(2)}
                                >
                                  Localidad
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Poppers>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Zoom 
                    bandIn={true}
                    click = {(e)=>{
                        const bodySide = document.getElementById("switchLock");
                        //const {mLLock} = this.state;
                        console.log(bodySide)
                        //window.innerWidth
                        if(!this.bandLock){
                          bodySide.style.marginLeft="0px";
                          bodySide.parentElement.style.backgroundColor="red";
                          bodySide.style.backgroundColor="white";
                          this.setState({IconLock: Lock})
                        }else{
                          bodySide.style.marginLeft="55px";
                          bodySide.parentElement.style.backgroundColor="green";
                          bodySide.style.backgroundColor="white";
                          this.setState({IconLock: Settings})
                        }
                        
                        this.bandLock = !this.bandLock;
                      // bodySide.style.width="calc(100% - 260px);"
                        //bodySide.style.width=window.innerWidth-260+"px"
                        //props.bandFadeSide[0] = true
                        //bodySide.classList.toggle('sideIN')
                        //document.getElementById("sideBtn").style.display='none'
                        //bodySide.classList.toggle("unlockClientes")
                      }}
                    cp={<div 
                    
                    style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)", zIndex: 9999, width: 100, height: 50, borderRadius: 30, paddingTop: 2,cursor: 'pointer',backgroundColor: 'red',}} >
                      <div
                      id='switchLock'
                      ref={this.refSwitch}
                       
                      className="wrapperClientes"
                      style={{display: 'flex', flex: 1,backgroundColor: 'white',  WebkitTransition:"all 0.321s ease-out", MozTransition:"all 0.321s ease-out", msTransition: "all 0.321s ease-out", transition: "all 0.321s ease-out", alignItems: 'center',justifyContent:'center', boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)", width: 45, height: 45, borderRadius: 30}} >
                        <IconLock />
                      </div>
                    </div>}

                    />
                    <div style={{width: 30}} />
                    <Fab c={this} bandIn={!this.bandLock} Icon={Edit} color='primary' handleClick={this.editClientes} />
                    <div style={{width: 30}} />
                    <Fab c={this} bandIn={!this.bandLock} Icon={Remove} color='secondary' handleClick={this.deleteCliente} />
                    
                    </div>
                  </div>
                  <TableComisarios
                    c={this}
                    tableHeaderColor="warning"
                    tableHead={headCells}
                    tableData={dataTable}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
          </>
  )
}

}