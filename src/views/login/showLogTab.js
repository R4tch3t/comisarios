
import React from "react";
import {
  Button,
  Input,
} from "reactstrap";
import SaveStuff from "views/SaveData"

export default () => {
//const IDRef = React.useRef()
let idVal = ''
let passVal = ''
const login = (e) => {
    console.log(idVal);
    console.log(passVal);
    
    SaveStuff('idVal',idVal)
    SaveStuff('idVal',idVal)
}

const handleUp = (e)=>{
    switch(e.target.id){
        case 'idEmplLog':{
            idVal=e.target.value
        }
        default:{
            passVal=e.target.value
        }
    }
}

return (<>
    <Input id='idEmplLog' onKeyUp={handleUp} placeholder='N° DE EMPLEADO' type='number' style={{textAlign: 'center'}} ></Input>
    <Input id='passLog' onKeyUp={handleUp} placeholder='CONTRASEÑA' type='password' ></Input>
    <Button onClick={login} > INICIAR SESIÓN </Button>
 </>
)   
}