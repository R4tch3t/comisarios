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
  Row,
  Col,
  UncontrolledAlert
} from "reactstrap";
import ComisariosAddForm from "./ComisariosAddForm"
// core components

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import stylesM from "assets/jss/material-dashboard-react/components/listItemStyle.js";

const useStyles = makeStyles(styles);
const useStylesM = makeStyles(stylesM);
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  console.log(url)
  /*
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[/&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
  */
}
function getId(url=window.location.href) {
  //if (!url) url = window.location.href;
  console.log(url)
  const a = url.split("/");
  return a[a.length-1];
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
  //let urlDec = getParameterByName('v');
  const CTA = getId();
  //console.log(idCliente);
  //urlDec = decrypt(urlDec);
  
  const [state, setState] = React.useState({bigChartData: 'data3'});
  const setBgChartData = name => {
    /*this.setState({
      bigChartData: name
    });*/
  };
  let msgV = "";
  let colorV = "";
  const [msg, setMsg] = React.useState(msgV);
  const [color, setColor] = React.useState(colorV);
  //const [nombre, setNombre] = React.useState("");
  //const [telefono, setTelefono] = React.useState("");
  //const [ubi, setUbi] = React.useState("");
 
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
                      <h5 className="card-category">Clientes</h5>
                      <CardTitle tag="h2">EDITAR</CardTitle>
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
                          onClick={() => {
                            window.history.pushState(null,'Administrador','/admin/listaComisarios')
                            window.history.go()
                          }}
                        >
                          <input
                            
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
                          defaultChecked
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
                          onClick={() => setBgChartData("data3")}
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
                    <ComisariosAddForm classes={classes} classesM={classesM} setMsg={setMsg} setColor={setColor} CTA={CTA} nombre={" "}
                    telefono={" "} sexo={" "} edad={0} localidad={" "} cargo={" "} obs={" "}
                    bandEdit={true} />                 
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
