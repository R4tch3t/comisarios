export default(d)=>{

    d=(d+"").split('Mon').join('Lunes').split('Tue').join('Martes');
    d=d.split('Wed').join('Miércoles').split('Thu').join('Jueves');
    d=d.split('Fri').join('Viernes').split('Sat').join('Sábado');
    d=d.split('Sun').join('Domingo');
    d=d.split('Jan').join('Enero').split('Feb').join('Febrero');
    d=d.split('Apr').join('Abril').split('May').join('Mayo');
    d=d.split('Jun').join('Junio').split('Jul').join('Julio');
    d=d.split('Aug').join('Agosto').split('Sep').join('Septiembre');
    d=d.split('Oct').join('Octubre').split('Nov').join('Noviembre').split('Dec').join('Diciembre');
    return d;

}