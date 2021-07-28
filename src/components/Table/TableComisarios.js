import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from "components/CustomButtons/Button.js";
import cookie from "react-cookies";
import CheckBox from '@material-ui/icons/Check';
import Download from "@material-ui/icons/SaveAlt";
import FindInPage from "@material-ui/icons/FindInPage"
import Fab from '@material-ui/core/Fab';
import Update from "@material-ui/icons/Publish";
import Zoom from '@material-ui/core/Zoom';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import encrypt from "views/Dashboard/encrypt";
import GridContainer from "components/Grid/GridContainer";
import {Calendar} from "views/calendar"
import {editComi,upLoadD } from "views/clientes/methods"
import ip from "variables/ip.js";

const useStyles = makeStyles(styles);
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, tableHead, tableHeaderColor, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((row, index) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={row.id}
                    sortDirection={orderBy === row.id ? order : false}
                    rowSpan='2'
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={createSortHandler(row.id)} 
                      >
                    {row.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })
            }
              {/*
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={tableHead[0].id}
                    sortDirection={orderBy === tableHead[0].id ? order : false}
                    rowSpan='2'
                    valign='baseline'
                  >
                    <TableSortLabel
                      active={orderBy === tableHead[0].id}
                      direction={order}
                      valign = 'bottom'
                      onClick={createSortHandler(tableHead[0].id)} 
                    >
                    {tableHead[0].label}
                    </TableSortLabel>
              </TableCell>
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={tableHead[1].id}
                    sortDirection={orderBy === tableHead[1].id ? order : false}
                    rowSpan='2'
                  >
                    <TableSortLabel
                      active={orderBy === tableHead[1].id}
                      direction={order}
                      onClick={createSortHandler(tableHead[1].id)} 
                      >
                    {tableHead[1].label}
                    </TableSortLabel>
              </TableCell>
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={tableHead[2].id}
                    sortDirection={orderBy === tableHead[2].id ? order : false}
                    rowSpan='2'
                  >
                    <TableSortLabel
                      active={orderBy === tableHead[2].id}
                      direction={order}
                      onClick={createSortHandler(tableHead[2].id)} 
                      >
                    {tableHead[2].label}
                    </TableSortLabel>
              </TableCell>
              
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={tableHead[3].id}
                    sortDirection={orderBy === tableHead[3].id ? order : false}
                    rowSpan='2'
                  >
                    <TableSortLabel
                      active={orderBy === tableHead[3].id}
                      direction={order}
                      onClick={createSortHandler(tableHead[3].id)} 
                      >
                    {tableHead[3].label}
                    </TableSortLabel>
              </TableCell>
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    colSpan='2'
                    align='center'
              >
                    {'Propiedad'}
              </TableCell>
              
            </TableRow>
            <TableRow className={classes.tableHeadRow}>
              
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={tableHead[4].id}
                    sortDirection={orderBy === tableHead[4].id ? order : false}
                    rowSpan='2'
                    align='center'
                  >
                    <TableSortLabel
                      active={orderBy === tableHead[4].id}
                      direction={order}
                      onClick={createSortHandler(tableHead[4].id)} 
                      >
                    {tableHead[4].label}
                    </TableSortLabel>
              </TableCell>
              <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={tableHead[5].id}
                    sortDirection={orderBy === tableHead[5].id ? order : false}
                    rowSpan='2'
                    align = 'center'
                  >
                    <TableSortLabel
                      active={orderBy === tableHead[5].id}
                      direction={order}
                      onClick={createSortHandler(tableHead[5].id)} 
                      >
                    {tableHead[5].label}
                    </TableSortLabel>
              </TableCell>
              */}
            </TableRow>
          </TableHead>
  );
}
const genCTA = (key, nombre, ubi, fecha, monto, velocidad, idVelocidad, dateSI, dateSF, difDate, expiro, idRecibo) => {
  const url = `/comisarios/editar/${key}`;
  const win = window.open(url, '_blank');
  win.focus();
  //const idRol = cookie.load('idRol')
  /*const idRol = "1";
  let url = idRol === '1' ? `/admin/listaComisarios` : `/usuario/listaComisarios` 
  let subUrl = `?bandCTA=1&idCliente=${idCliente}&nombre=${nombre}&ubi=${ubi}&fecha=${fecha}&dateSI=${dateSI}&dateSF=${dateSF}&monto=${monto}&idVelocidad=${idVelocidad}&velocidad=${velocidad}&difDate=${difDate}&expiro=${expiro}&pagar=0&idRecibo=${idRecibo}`
  //console.log(subUrl)
  url += `?v=${encrypt(subUrl)}`;
  //window.history.pushState(null,'Administrador','#/admin/creditos')
    //       window.history.go()
  const win = window.open(url, '_blank');
  win.focus();*/
}
const genCarta = (CTA, nombre, ubi, tp) => {
  const idRol = cookie.load('idRol')
  let url = idRol === '1' ? `#/admin/padron` : `#/usuario/padron`
  const y = new Date().getFullYear()
  let subUrl = `?bandCarta=1&genCTA=${CTA}&nombre=${nombre}&ubi=${ubi}&tp=${tp}`
  subUrl+=`&añoI=${y}&añoF=${y}`
  url += `?v=${encrypt(subUrl)}`;
  const win = window.open(url, '_blank');
  win.focus();
}
class wrappCalendar {
  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  dateSI = new Date(Date.now() - this.tzoffset);
  dateSF = new Date(Date.now() - this.tzoffset);
  idUsuario=0;
  bandWrappCalendar = true;
  constructor(props){
   // super(props);
    //corte.options.high = 1000000
    //corte.data.labels = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    //corte.data.series = [[]]
    this.tzoffset = (new Date()).getTimezoneOffset() * 60000;
    this.dateSI = new Date(Date.now() - this.tzoffset);
    this.dateSF = new Date(Date.now() - this.tzoffset);
    this.dateSI.setHours(0,0,0,0);
    this.dateSF.setHours(0,0,0,0);
    const d = new Date();
    this.state={
      idCliente: props.idCliente,
      idRecibo: props.idRecibo,
      nombre: props.nombre,
      telefono: props.telefono,
      ubi: props.ubi, 
      fechaSI: props.dateSI,
      fechaSF: props.dateSF,
      fechaPago: props.fechaPago,
      monto: props.monto, 
      difDate: props.difDate,
      idVelocidad: props.idVelocidad,
      velocidad: props.velocidad,
      bandLock: props.bandLock
    }
    
  }
  _setState=(v)=>{
    const {fechaSI, fechaSF, monto, difDate, idVelocidad, bandLock} = v
    const {nombre, telefono, ubi, fechaPago} = this.state;
    editComi(this,nombre,telefono,ubi,idVelocidad, monto, difDate, fechaSI, fechaSF, fechaPago, true);
    this.state.fechaSI = fechaSI;
    this.state.fechaSF = fechaSF;
    this.state.monto = monto;
    this.state.difDate = difDate;
    this.state.idVelocidad = idVelocidad;
    this.state.bandLock = bandLock;

    //this.setState({fechaSI, fechaSF, monto, difDate, idVelocidad});
  }
}
export default function CustomTable(props) {
  
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, c } = props;
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  let CTA = '';
  

  const rows = tableData;
  const {bandLock} = props.c
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //const c = new wrappCalendar();
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const theme = useTheme();
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };
  const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const selectFile = async () => {
      console.log("selectFile"+CTA);    
        const file = document.querySelector('#file-input'+CTA).files[0]
        const result = await toBase64(file).catch(e => e);
        document.getElementById("file-input"+CTA).value=""
        if (result instanceof Error) {
        console.log('Error: ', result.message);
            return;
        }
        c.base64 = `${result}`
        document.getElementById('pdfToUp'+CTA).value = file.name
        document.getElementById('doc'+CTA).innerHTML = file.name
        c.bandUpTramite = false;
        c.showNotification('trBO','CARGANDO... 0 %',CTA);
        //c.serialScan=Math.random()+""
        //c.serialScan='0'
        upLoadD(CTA,c);
        //noDisabled()
        //c.updateNB()
    };
  
  const getD = (CTA,d) => {
    //tp = tp[0].toLowerCase()
    const docName=document.getElementById('doc'+CTA).innerHTML
    let root = null;
    if(d){
      //url = `${ip(2998)}docomid/${CTA}/${docName}`;
      root="docomid"
    }else{
      //url = `${ip(2998)}docomi/${CTA}/${docName}`;
      root="docomi"
    }
    let url = `${ip(2998)}${root}/${CTA}/${docName}`;
    const win = window.open(url, '_blank');
    win.focus();
  }

  /*const upLoadD = (NP)=>{
    console.log(NP);
  } */
  //let wrapC = null

  try{
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
        <EnhancedTableHead
              classes={classes}
              tableHeaderColor={tableHeaderColor}
              order={order}
              orderBy={orderBy}
              tableHead={tableHead}
            //  onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
        />): null}
        
        <TableBody>
          { 
            stableSort(rows, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              //console.log(row)
              const kFile = row.key;
              try{
                const wrapC = new wrappCalendar({idCliente: row.key,idRecibo: row.idRecibo, nombre: row.cliente, telefono: row.telefono, ubi: row.ubi,  
                                          dateSI: row.dateSI, dateSF: row.dateSF, fechaPago: row.fechaDePago, idVelocidad: row.idVelocidad, monto: row.montor, difDate: row.difDate, bandLock
                                          ,velocidad: row.velocidad      });
               // const [idVelocidad, setIdVelocidad] = React.useState(row.idVelocidad);
               // const [velocidad, setVelocidad] = React.useState(row.velocidad);
            return (
              <TableRow key={row.key}  
              onMouseEnter={()=>{
                                      //      console.log(row.refRow)
                                            if(row.refRow&&row.refRow.current){
                                                row.refRow.current.style.opacity = 1;
                                            }
              }}
              onMouseLeave={()=>{
                if(row.refRow&&row.refRow.current){
                  row.refRow.current.style.opacity = 0;
                }
              }} 
        className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell} style={{textAlign: 'center', 
                WebkitTransition: 'all 0.7s ease-out',
                transition: 'all 0.7s ease-out'}}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{
                    e.currentTarget.style.webkitTransition="all 0.7s ease-out";
                    e.currentTarget.style.transition="all 0.7s ease-out";
                    if(bandLock){
                      genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)
                    }else{

                    }
                    }} >
                  {row.key}
                  <Zoom
                    //key={fab.color}
                    in={!bandLock}
                    onClick={(e)=>{
                  //  console.log(e)
                    c.deleteStack[row.key]=row.key
                    if(e.target.nodeName!=="BUTTON"){
                      e=e.target.parentElement
                      while(e.nodeName!=="BUTTON"){
                        e=e.parentElement
                      }
                    }else{
                      e=e.target
                    }
                    if(e.id==="checked"+row.key){
                          e.id=""
                          e.style.opacity=0.5
                        }else{
                          e.id="checked"+row.key
                          e.style.opacity=1
                        }
                      /*
                      if(e.target.childElementCount===1){
                        if(e.target.parentElement.id==="checked"+row.key){
                          e.target.parentElement.id=""
                          e.target.parentElement.style.opacity=0.5
                        }else{
                          e.target.parentElement.id="checked"+row.key
                        }
                      }

                      if(e.target.childElementCount===2){
                        if(e.target.id==="checked"+row.key){
                          e.target.id=""
                          e.target.style.opacity=0.5
                        }else{
                          e.target.id="checked"+row.key
                        }
                      }*/

                    }}
                    onMouseEnter={(e)=>{//console.log(e)
                      if(e.target.nodeName!=="BUTTON"){
                        e=e.target.parentElement
                        while(e.nodeName!=="BUTTON"){
                          e=e.parentElement
                        }
                      }else{
                        e=e.target
                      }
                      e.style.opacity=1
                      /*if(e.target.childElementCount===0){
                        e.target.parentElement.parentElement.style.opacity=1
                      }

                      if(e.target.childElementCount===1){
                        e.target.parentElement.style.opacity=1
                      }

                      if(e.target.childElementCount===2){
                        e.target.style.opacity=1
                      }*/
                    }}
                    onMouseLeave={
                      (e)=>{
                        if(e.target.nodeName!=="BUTTON"){
                        e=e.target.parentElement
                        while(e.nodeName!=="BUTTON"){
                          e=e.parentElement
                        }
                      }else{
                        e=e.target
                      }
                      if(e.id===""){
                            e.style.opacity=0.5
                      }
                        /*if(e.target.childElementCount===0){
                          if(e.target.parentElement.parentElement.id===""){
                            e.target.parentElement.parentElement.style.opacity=0.5
                          }
                        }

                      if(e.target.childElementCount===1){
                        if(e.target.parentElement.id===""){
                          e.target.parentElement.style.opacity=0.5
                        }
                      }

                      if(e.target.childElementCount===2){
                        if(e.target.id===""){
                          e.target.style.opacity=0.5
                        }
                      }*/

                      }
                    }
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${!bandLock?transitionDuration.exit:"0"}ms`,
                      opacity: 0.5
                    }}
                    unmountOnExit
                  >
                  <Fab color="primary" aria-label="add">
                        <CheckBox />
                  </Fab>
                </Zoom>
                  
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}} >
                  {row.nombre}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}} >
                  {row.sexo}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}} >
                  {row.edad}
                </TableCell>
                <TableCell className={classes.tableCell} 
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}} >
                  {row.telefono}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}>
                  {row.localidad}
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}>
                  {row.cargo}
                </TableCell>
                {/*<TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}>
                  {row.dateSI?row.dateSI:(<i>Sin recibo</i>)}
            </TableCell>*/}
                <TableCell className={classes.tableCell}
                  //onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  //onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}
                >
                  <><h4 className={classes.cardTitleBlack} style={{color: 'red'}}>
                       {row.fechaN}
                    </h4>
                      {/*<Calendar c={wrapC}  
                         />*/}
                  </>
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  //onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}
                >
                  {
                    //row.fechaPago?row.fechaPago:(row.fechaDePago?row.fechaDePago:(<i>Sin recibo</i>))
                  }
                  <h4 id="fechaPagoH" className={classes.cardTitleBlack} style={{color: (row.fechaDePago?'green':'red') }}>
                        {row.fechaE}
                  </h4>
                      
                       {
                         /*<Calendar c={wrapC} bandRange={true} />*/
                       }
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  //onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}
                >
                  <div style={{color: 'green'}} >
                    {row.obs}
                  </div>
                </TableCell>
                <TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  //onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}
                >
                  <div id={`doc${row.key}`} style={{color: 'green'}} >
                    {row.documento}
                  </div>
                </TableCell>
                
                {/*<TableCell className={classes.tableCell}
                  onMouseEnter={(e)=>{e.target.style.cursor='pointer'}}
                  //onMouseUp={(e)=>{genCTA(row.key,row.cliente,row.ubi,row.fechaDePago,row.montor,row.velocidad,row.idVelocidad,row.dateSI,row.dateSF,row.difDate,row.expiro,row.idRecibo)}}
                >
                  <div id={`row.monto[${row.key}]`}  >
                    <input id={'pdfToUp'+row.key}  type='hidden'/> 
                    <input id={"file-input"+row.key} type="file" onChange={selectFile} name="avatar" style={{display: 'none'}} />
                   <Zoom
                    //key={fab.color}
                    in={!bandLock}
                    onClick={()=>{
                        CTA=row.key
                        document.getElementById('file-input'+CTA).click()
                      }}
                    
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${!bandLock?transitionDuration.exit:"0"}ms`,
                      opacity: 1
                    }}
                    unmountOnExit
                  >
                    
                    <Fab color='default' style={{backgroundColor: 'green', color:'white'}} aria-label="add">
                      <Update/>
                    </Fab>
                    
                  </Zoom>
                    {row.documento && <>
                    <Zoom
                    //key={fab.color}
                    in={!bandLock}
                    onClick={()=>{
                                  CTA=row.key;
                                  getD(CTA);
                                }}
                    
                    
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${!bandLock?transitionDuration.exit:"0"}ms`,
                      opacity: 1
                    }}
                    unmountOnExit
                  >
                    
                    <Fab color='primary' aria-label="add">
                   
                                <FindInPage />
                    </Fab>            
                    </Zoom>
                              
                    <Zoom
                    //key={fab.color}
                    in={!bandLock}
                    onClick={()=>{
                                  CTA=row.key;
                                  getD(CTA,true);
                                }}
                    
                    
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${!bandLock?transitionDuration.exit:"0"}ms`,
                      opacity: 1
                    }}
                    unmountOnExit
                  >
                    
                    <Fab color='primary' aria-label="add">
                                <Download />
                    </Fab>
                    </Zoom>            
                              
                      </>

                    }
                  
                    
                  </div>
                </TableCell>*/
                }

               {/* <TableCell className={classes.tableCell}>
                  <GridContainer> 
                    
                    {row.cargo2}
                      
                  </GridContainer>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.terreno}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {row.construccion}
                </TableCell>*/}

              </TableRow>
            );
            }catch(e){

            }
          })}
          {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 48) * emptyRows }} >
                  <TableCell colSpan={6} />
                </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage = {`Filas por página:`}
          labelDisplayedRows={(_ref)=>{
            var from = _ref.from,
              to = _ref.to,
              count = _ref.count;
            return "".concat(from, "-").concat(to, " de ").concat(count);
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
  }catch(e){
    return(<></>)
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  tableData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any))
};
