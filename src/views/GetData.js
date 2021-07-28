//import cookie from "react-cookies";
import decrypt from "views/Dashboard/decrypt.js";
import ls from 'local-storage'
export default (s) => {
        
       s=ls.get(s);
       s=s?decrypt(s):'';
       return s;
       //ls.set('pass', encrypt(pass));

  }