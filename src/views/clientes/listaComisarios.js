/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

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
  UncontrolledAlert
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

import TablesComisarios from "./TablesComisarios.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";
import decrypt from "views/Dashboard/decrypt.js";
import Pdf from "./renderRecibo"

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export default () => {

  //
  //const [color, setColor] = React.useState("")
  /*constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }*/
  const classes = useStyles();
  const classesM = useStylesM();
  let urlDec = getParameterByName('v');
  urlDec = decrypt(urlDec);
  const bandCTA = getParameterByName('bandCTA', urlDec)
  const idCliente = getParameterByName('idCliente', urlDec)
  const nombre = getParameterByName('nombre', urlDec)
  const ubi = getParameterByName('ubi', urlDec)
  const fecha = getParameterByName('fecha', urlDec)
  const monto = getParameterByName('monto', urlDec)
  console.log(fecha)
  const añoI = getParameterByName('añoI', urlDec)
  const añoF = getParameterByName('añoF', urlDec)
  const pagar = getParameterByName('pagar', urlDec)
  const velocidad = getParameterByName('velocidad', urlDec)
  const idVelocidad = getParameterByName('idVelocidad', urlDec)
  const dateSI = getParameterByName('dateSI', urlDec)
  const dateSF = getParameterByName('dateSF', urlDec)
  const difDate = getParameterByName("difDate",urlDec)
  const expiro = getParameterByName("expiro",urlDec)
  const idRecibo = getParameterByName("idRecibo",urlDec)
  const isUpdated = getParameterByName("isUpdated",urlDec)
  //const isDeleted = getParameterByName("isDeleted",urlDec)
  const [state, setState] = React.useState({bigChartData: 'data1'})
  const setBgChartData = name => {
    /*this.setState({
      bigChartData: name
    });*/
  };
  //msg = "";
  //color = "";
  let msgV = ""
  let colorV = ""
  if(isUpdated==="1"){
    msgV="El Pago se realizó con éxito"
    colorV="success"
  }/*else if(isDeleted==="1") {
    setMsg("El Recibo se eliminó con éxito")
    setColor("danger")
  }*/
  const [msg, setMsg] = React.useState(msgV)
  const [color, setColor] = React.useState(colorV)
    return (
      <>
        <div className="content">
        {msg!==""&&
        <UncontrolledAlert color={color} >
            <span>{msg}</span>
        </UncontrolledAlert>}
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">{bandCTA==="1"?"Pagos":"Clientes"}</h5>
                      <CardTitle tag="h2">{bandCTA==="1"?"RECIBOS":"REGISTRADOS"}</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Registrados
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: state.bigChartData === "data2"
                          })}
                          onClick={() => {
                            window.history.pushState(null,'Administrador','/admin/agregarComisario')
                            window.history.go()
                          }}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Registrar Comisario
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: state.bigChartData === "data3"
                          })}
                          onClick={() => {
                            window.history.pushState(null,'Administrador','/admin/editarComisario')
                            window.history.go()
                          }}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Editar Comisario
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div >
                    {bandCTA==='1' && 
                      <Pdf classes={classes} idCliente={idCliente}  nombre={nombre}
                        ubi={ubi} fecha={fecha} monto={monto} idVelocidad={idVelocidad} dateSI={dateSI} dateSF={dateSF} velocidad={velocidad}
                        pagar={pagar} difDate={difDate} expiro={expiro} idRecibo={idRecibo} setMsg={setMsg} setColor={setColor} />
                    }
                    {bandCTA!=='1' && 
                      <TablesComisarios
                        classes={classes} classesM={classesM} />
                    }                  
                    {/*<Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />*/}

                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
         
        </div>
      </>
    );
  
}

//export default Dashboard;
