import React, { useState } from 'react'
import { es } from 'date-fns/locale'
import { DateRangePicker, START_DATE, END_DATE, DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css';
import toSpanishDate from 'views/calendar/toSpanishDate'
import GridItem from "components/Grid/GridItem.js";

export default function DateRangePickerExample(props) {
  const {c,bandRange,labelID,classes} = props
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [dateN, setDateN] = useState();
  const [dateE, setDateE] = useState();
  c.dateSI=startDate
  c.dateSF=endDate

  //console.log(startDate)
  if(bandRange)
  return(
    <>
    <GridItem xs={12} sm={12} md={6}>
                      <h4 id="fechaNacimiento" className={classes.cardTitleBlack}>
                          FECHA DE NACIMIENTO:
                      </h4>
                      
    <DatePicker
      date={dateN} onDateChange =
      {
        (date)=>{
        
          if(c.bandWrappCalendar){
            const {fechaSI, fechaSF, monto, difDate, idVelocidad, bandLock} = c.state
            c.state.fechaN=date;          
            c._setState({fechaSI, fechaSF, monto, difDate, idVelocidad, bandLock});
          }else{
            c.setState({fechaN: date});
          }
          c.setState({height: 50})
          setDateN(date);
        
        }
    }
      format='dd MMM yyyy'
      locale={es}
    >
      {({ inputProps, focused }) => (
        <input
          className={'input' + (focused ? ' -focused' : '')}
          {...inputProps}
          value={c.state.fechaN!=="undefined"?toSpanishDate(c.state.fechaN):""}
          style={{width: '100%'}}
          onMouseUp={()=>{
            const fechaL = document.getElementById(labelID);
            c.setState({height: 400})
            //const calendar = fechaL.nextElementSibling.firstChild.nextElementSibling;
            
            //calendar.style.position='absolute'
            //calendar.style.right=0
          }}
          /*onMouseEnter={()=>{
            c.setState({height: 400})
          }}
          onMouseLeave={()=>{
            c.setState({height: 50})
          }}*/
          disabled={c.state.bandLock}
        />
      )}
    </DatePicker>
   </GridItem> 
   <GridItem xs={12} sm={12} md={6}>
                      <h4 id="fechaEleccion" className={classes.cardTitleBlack}>
                          FECHA DE ELECCIÓN:
                      </h4>
      <DatePicker
        date={dateE} onDateChange =
        {
          (date)=>{
          
            if(c.bandWrappCalendar){
              const {fechaSI, fechaSF, monto, difDate, idVelocidad, bandLock} = c.state
              c.state.fechaE=date;          
              c._setState({fechaSI, fechaSF, monto, difDate, idVelocidad, bandLock});
            }else{
              c.setState({fechaE: date});
            }
            c.setState({height: 50})
            setDateE(date);
          
          }
      }
        format='dd MMM yyyy'
        locale={es}
        
      >
        {({ inputProps, focused }) => (
          <input
            className={'input' + (focused ? ' -focused' : '')}
            {...inputProps}
            value={c.state.fechaE!=="undefined"?toSpanishDate(c.state.fechaE):""}
            style={{width: '100%'}}
            onMouseUp={()=>{
            const fechaL = document.getElementById(labelID);
              c.setState({height: 400})
            }}
            
            disabled={c.state.bandLock}
          />
        )}
      </DatePicker>
    </GridItem> 
    </>
  )
  else
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={(date)=>{
        //const pagarH = document.getElementById("pagar")
        //pagarH.value="250"
        //c.setState({pagar: 250})
        //c.setState({fechaSI: date})
        if(c.bandWrappCalendar){
          c.state.fechaSI = date;

        }
        setStartDate(date);
      }}
      onEndDateChange={(date)=>{
        let difDate = 0
        let pagar = 0;
        const dateA = new Date(startDate);
        const dateB = new Date(date);
        const {idCliente,idVelocidad} = c.state;
        let vel = "";
        while(dateA<dateB){
          dateA.setMonth(dateA.getMonth()+1);
          difDate++;
        }
     //   console.log(`idVelocidad: ${idVelocidad}`)
        switch(idVelocidad){
          case 1: 
            pagar = 250 * difDate;
            vel="20 MEGAS";
          break;
          case 2: 
            pagar = 300 * difDate
            vel="30 MEGAS";
          break;
          default:
            pagar = 150 * difDate
            vel="10 MEGAS";
          break
        }
        const monto = pagar
        if(c.bandWrappCalendar){
          
          document.getElementById(`row.velocidad[${idCliente}]`).innerHTML=vel;
          document.getElementById(`row.monto[${idCliente}]`).innerHTML=monto;
          c.state.velocidad=vel;
//          const { fechaSF, idVelocidad, bandLock} = v
          const fechaSI = startDate.toISOString();
          const fechaSF = date.toISOString();
          const v = {fechaSI, fechaSF, monto, difDate, idVelocidad, bandLock:false}
          c._setState(v);
        }else{
          c.setState({monto,difDate,fechaSI: startDate.toISOString(), fechaSF: date.toISOString()});
        }
      //  console.log(c.state.fechaSI)
       // console.log(c.state.fechaSF)
       // console.log(date)
        setEndDate(date);
      }}
      //minimumDate={new Date()}
      //minimumLength={1}
      format='dd MMM yyyy'
      locale={es}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === START_DATE ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Fecha inicial'
            style={{marginRight: 20}}
            value={c.state.fechaSI!=="undefined"?c.state.fechaSI:(startDate?startDate:"")}
            disabled={c.state.bandLock}
          />
           {">"}
          <input
            className={'input' + (focus === END_DATE ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='Fecha final'
            style={{marginLeft: 20}}
            value={c.state.fechaSF!=="undefined"?c.state.fechaSF:(endDate?endDate:"")}
            disabled={c.state.bandLock}
          />
        </div>
      )}
    </DateRangePicker>
  )
}