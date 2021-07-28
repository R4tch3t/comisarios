//import cookie from "react-cookies";
import encrypt from "views/Dashboard/encrypt.js";
import ls from 'local-storage'
export default (n,o) => {
        
       ls.set(n, encrypt(o));
       //ls.set('pass', encrypt(pass));

  }