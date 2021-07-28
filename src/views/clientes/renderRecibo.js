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
import {
  MobileView,
  isMobile
} from "react-device-detect";
import { MobilePDFReader } from "react-read-pdf";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import LogoI from "assets/img/default-avatar.png";
import pie from "assets/img/pie.jpg";
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
import {delRecibo, genRecibo} from "./methods"
import WN from "@material-ui/icons/Warning"
//import spellNumber from "./spellNumber";
//import InformeM from "./InformeM";
// reactstrap components
import {
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
} from "reactstrap";

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
  //state = { url: null , dia: null, mes: null, año: null, renderPDF: null};
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  dateSI = new Date(Date.now() - this.tzoffset);
  dateSF = new Date(Date.now() - this.tzoffset);
  idUsuario=0;
  constructor(props){
    super(props);
    //corte.options.high = 1000000
    //corte.data.labels = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    //corte.data.series = [[]]
    this.tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.dateSI = new Date(Date.now() - this.tzoffset);
    this.dateSF = new Date(Date.now() - this.tzoffset);
    this.dateSI.setHours(0,0,0,0);
    this.dateSF.setHours(0,0,0,0);
    const d = new Date();
    console.log("props.monto")
    console.log(props.monto)
    this.state={
      url:null,
      dia: d.getDate(),
      mes: d.getMonth(),
      año: d.getFullYear(),
      urbanoI: 0,
      idCliente: props.idCliente,
      nombre: props.nombre,
      ubi: props.ubi,
      monto: props.monto,
      fechaPago: this.dateSI.toISOString(),
      expiro: props.expiro,
      idVelocidad: props.idVelocidad,
      velocidad: props.velocidad,
      pagar: props.pagar,
      fechaSI: props.dateSI,
      fechaSF: props.dateSF,
      difDate: props.difDate,
      bandGen: false,
      idRecibo: props.idRecibo,
      setMsg: props.setMsg,
      setColor: props.setColor
      
    }
    
  }
  
    
    

  onRender = ({ blob }) => {
    this.setState({ url: URL.createObjectURL(blob) });
    console.log(blob)
    console.log(isMobile)
    if (isMobile){
      let pdfview = document.getElementById("pdfView");
      let mobilePdf = document.getElementById('mobilePdf');
      let h = window.devicePixelRatio<2?960:360 //window.screen.availHeight;
      mobilePdf.style.height=`${h}px`;
      pdfview.style.display='none';
      ReactDOM.unmountComponentAtNode(mobilePdf)
      ReactDOM.render(<MobilePDFReader url={this.state.url} />, mobilePdf);
    }
  };
  
  handdleUp = (e) => {
    const {fechaSI,fechaSF} = this.state
    //e.target.disabled = true
    this.setState({bandGen: true})
    
    const nombre = document.getElementById('nombre').value;
    const ubi = document.getElementById('ubi').value;
    //const añoF = document.getElementById('añoF').value
    //const totalA = spellNumber(parseInt(añoF) - parseInt(añoI)).replace('PESOS', '').replace('PESO', '')
    const pagar = document.getElementById('pagar').value;
    const fechaPago = new Date(new Date(Date.now()) - this.tzoffset).toISOString().slice(0, -1);
    let dateSI = new Date(fechaSI);
    let dateSF = new Date(fechaSF);
    dateSI = new Date(dateSI - this.tzoffset);
    dateSF = new Date(dateSF - this.tzoffset);
    genRecibo(this,nombre,ubi,pagar,fechaPago,fechaSI,fechaSF)
  }

  handdleDel = (e) => {
    delRecibo(this);


  }

  handdleU = (e) => {
    const ubi = document.getElementById('ubi').value
    this.setState({ubi})
  }

  handleUpper = e => {
    if (e.which === 32 || e.which > 39) {
      this.selectionStartNombre = e.target.selectionStart
      this.selectionEndNombre = e.target.selectionEnd
      e.target.value = e.target.value.toUpperCase()
      e.target.setSelectionRange(this.selectionStartNombre, this.selectionEndNombre);
    }else if(e.which===13){
      this.handdleUp()
    }
  }

  handleUpperN = e => {
    if (e.which === 13) {
      this.handdleUp()
    }
  }
  componentDidMount(){
   // InformeM(this.props.dateSI, this.props.dateSF, this)
  }

  styles = StyleSheet.create({
    logoI: {
      position: "absolute",
      width: 125,
      height: 125,
      left: 20,
      top: 20
    },
    pie: {
      position: "absolute",
      width: "100%",
      height: 375,
      left: 0,
      bottom: 0
    },
    logoD: {
      position: "absolute",
      width: 125,
      height: 50,
      right: 15,
      top: 30
    },
    logoB: {
      position: "absolute",
      width: 600,
      opacity: 0.7,
      height: 500,
      left: 40,
      top: 150
    },
    cintillo: {
      position: "absolute",
      width: '95%',
      height: 30,
      right: 15,
      left: 15,
      bottom: 60
    },
    headV: {
      textAlign: 'left',
      top: 20,
      left: 160
    },
    headT: {
      fontFamily: "Roboto",
      fontWeight: 'bold',
      color: "white",
      left: 230,
      top: 70,
      paddingLeft: 40,
      backgroundColor: 'black',
      width: 170
    },
    headO: {
      fontFamily: "Roboto",
      fontWeight: 'bold',
    },
    labelR: {
      fontFamily: "Roboto",
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    table: { 
      position:'relative',
      display: "table", 
      width: "40%", 
      left: 30,
      top: 30,
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    },
    tableRow: { 
      margin: "auto",
      height: 20, 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "100%", 
      borderStyle: "solid", 
      borderWidth: 0.5, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableCol2: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCol3: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCell: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 8,
      textAlign: 'center',
      paddingVertical: 3
    },
    tableCell2: { 
      marginLeft: 0, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 6,
      textAlign: 'center',
      paddingVertical: 3
    }

  });
onChangeDI = date => {
  const {dateSF} = this.state
  let dateNSF = new Date(dateSF)
  dateNSF.setDate(dateSF.getDate() + 1);
  console.log('DI00')
  //this.obtenerOF(date, dateNSF)
  this.setState({ dateSI: date })
}
onChangeDF = date => {
  const {dateSI} = this.state
  let dateNSF = new Date(date);
  dateNSF.setDate(date.getDate() + 1);
  console.log('DF00')
  //this.obtenerOF(dateSI, dateNSF);
  this.setState({ dateSF: date })
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
  render() {
    const {classes} = this.props
    const {dia, idCliente, nombre, ubi, fechaPago, monto, mes, año,pagar, fechaSI, fechaSF, añoF, idVelocidad, velocidad,difDate, expiro,bandGen,idRecibo} = this.state
    const nDoc = `RECIBO_CLIENTE_${idCliente}`
    //const dateSI = "";
    //const dateSF = ""
    return (
      <CardIcon>
        {expiro === "1" && <>
            <div style={{position: 'absolute', opacity:1, top:80, paddingTop:15, backgroundColor: 'red', zIndex:9999, alignContent:'center', height: 50, borderRadius: 20, boxShadow: "4px 4px 4px 2px rgba(1, 1, 1, 0.2)",  borderWidth: 0.5, borderColor: 'black', elevation: 2}}>
                    <WN color="inherit"  
                    /> <i style={{color:'white'}} >¡ADVERTENCÍA! Él número de cliente presenta un adeudo, favor de hacer el pago.</i>
            </div>
                  </>}
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
              <React.Fragment>
                  <GridContainer>
                    
                  <GridItem xs={12} sm={12} md={3}>
                  
                      <CustomInput
                        labelText="NOMBRE:"
                        id="nombre"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: nombre,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="UBICACIÓN:"
                        id="ubi"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          defaultValue: ubi,
                          //onBlur: this.handdleU
                          onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                    <UncontrolledDropdown style={{position: 'relative', left: 0}}>
                      <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                          style={{width: 90}}
                        >
                        VELOCIDAD: 
                        </DropdownToggle>
                        <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                        >
                          <i className="tim-icons icon-settings-gear-63" />
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink" left>
                          <DropdownItem
                           // href="#pablo"
                           style={{cursor: 'pointer'}}
                            onClick={e => {
                              /*let difDate = 0
                              let pagar = 0;
                              const {fechaSI, fechaSF} = this.state
                              const dateA = new Date(fechaSI);
                              const dateB = new Date(fechaSF);
                              //const {idVelocidad} = this.state;
                              while(dateA<dateB){
                                dateA.setMonth(dateA.getMonth()+1);
                                difDate++;
                              }*/
                              this.setTotal(150,0,e.target.innerHTML)
                            
                            }}
                          >
                            10 MEGAS
                          </DropdownItem>
                          <DropdownItem
                           // href="#pablo"
                           style={{cursor: 'pointer'}}
                            onClick={e => {
                              this.setTotal(250,1,e.target.innerHTML)
                            }}
                          >
                            20 MEGAS
                          </DropdownItem>
                          <DropdownItem
                           // href="#pablo"
                           style={{cursor: 'pointer'}}
                            onClick={e => {
                              this.setTotal(300,2,e.target.innerHTML)
                            
                            }}
                          >
                            30 MEGAS
                          </DropdownItem>
                        </DropdownMenu>
                        <div style={{height: 7}} />
                        {velocidad!=="undefined"?velocidad:"10 MEGAS"}
                      </UncontrolledDropdown>
                  
                    </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="A PAGAR:"
                        id="pagar"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "number",
                          //defaultValue: parseInt(pagar)===0?monto:pagar,
                          value: monto!=="undefined"?monto:150
                          //onBlur: this.handdleU
                          //onKeyUp: this.handleUpper,
                          //onMouseUp: this.handdleU
                        }}
                      />
                    </GridItem>

                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <h4 className={classes.cardTitleBlack}>
                        PERIODO DE SUBSCRIPCIÓN:
                      </h4>
                      <Calendar c={this} />
                    </GridItem>
                  </GridContainer>

                  <GridContainer>
                    <Button id='btnPagar' color="success" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleUp}
                      disabled={expiro==="0"||bandGen}
                      >
                        PAGAR
                      </Button>
                  </GridContainer>
                  <GridContainer>
                    <Button color="danger" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} 
                      onClick={this.handdleDel}
                      disabled={expiro!=="0"||bandGen}
                      >
                        CANCELAR PAGO
                      </Button>
                  </GridContainer>
                  <GridContainer>
                    <a style={{color: 'white',
                      display: "flex",
                      flex: 1,
                      alignItems: "center"}} href={this.state.url} download={`${nDoc}.pdf`}>  
                      <Button color="info" 
                      style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center"
                      }} >
                        Descargar PDF
                      </Button>
                    </a>  
                  </GridContainer>  
                  <MobileView>
                    <div id='mobilePdf' style={{ position: 'relative', top: 20, width: '100%' }} ></div>
                    
                  </MobileView>

                  <PDFViewer id='pdfView' style={{ width: '100%', height: 1180 }}  >
                  <Document shallow onRender={this.onRender} title={`${nDoc}.pdf`} >
                    <Page size="letter" wrap>
                      <Image src={LogoI} style={this.styles.logoI} />
                      <View style={this.styles.headV} >
                        <Text style={[this.styles.headO,{position: "relative", top: 10, fontSize: 10}]} >
                          INTERRED
                        </Text>
                        <Text style={[this.styles.headO,{position: "relative", top: 10, fontSize: 10}]} >
                          INTERNET POR CABLE E INALÁMBRICO
                        </Text>
                        <Text style={[{position: "absolute", top: 10, left: 220, fontSize: 7}]} >
                          CORREO ELECTRÓNICO: CASMORNEZA@GMAIL.COM 
                        </Text>
                        <Text style={[{position: "absolute", top: 20, left: 220, fontSize: 7}]} >
                          DIRECCIÓN: CALLE DEL CAMPESINO S/N.
                        </Text>
                        <Text style={[{position: "absolute", top: 30, left: 220, fontSize: 7}]} >
                          COLONIA EMILIANO ZAPATA.
                        </Text>
                        
                      </View>
                     <View style={this.styles.headT} >
                      <Text style={[{ fontSize: 12}]} >
                          RECIBO DE PAGO
                      </Text>
                     </View>
                     <View style={[this.styles.table, {top: 75, left: 320}]}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white'}]}>RECIBO NÚMERO</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white'}]}>FECHA DE PAGO</Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                          <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>{idCliente}</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                    <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>{fechaPago}</Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.table, {top: 85, left: 443, width: '20%'}]}> 
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>CANTIDAD:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '50%'}]}>  
                    <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, textAlign: 'left'}]}>$ {parseInt(difDate)===1?`${difDate} mes`:`${difDate} meses`}</Text> 
                          </View> 
                        </View>
                      </View>  

                      <View style={[this.styles.table, {top: 100, left: 20, width: '90%'}]}> 
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>NOMBRE DEL CLIENTE:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>{nombre}</Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>UBICACIÓN:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                    <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>{ubi}</Text> 
                          </View> 
                        </View>
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%', borderColor: 'white', backgroundColor: 'black'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, color: 'white', textAlign: 'left'}]}>PERIODO DE PAGO:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>{fechaSI+" > "+fechaSF}</Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.table, {top: 120, left: 20, width: '40%'}]}> 
                        
                        <View style={this.styles.tableRow}> 
                          <View style={[this.styles.tableCol,{width: '30%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2}]}>A PAGAR:</Text> 
                          </View>
                          <View style={[this.styles.tableCol,{width: '70%'}]}>  
                            <Text style={[this.styles.tableCell,this.styles.headO,{paddingVertical: 2, textAlign: 'left'}]}>$ {monto}</Text> 
                          </View> 
                        </View>
                      </View>
                      <View style={[this.styles.headV, {top: 150, left: 20}]} >
                        <Text style={[this.styles.headO,{position: "relative", fontSize: 10, width: '90%'}]} >
                          Le recordamos realizar su pago, antes de su fecha límite, sí tu mensualidad se venció y no cuentas con el servicio, al realizar tu pago tendrá que esperar un aproximado de 24 horas para que su señal vuelva a reactivarse INTERRED AGRADECE TU PREFERENCIA Navega más rápido...............................................................................
                        </Text>
                        
                      </View>
                      {/*<Image src={pie} style={this.styles.pie} />*/}
                     
                    </Page>
                  </Document>
                  </PDFViewer>
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