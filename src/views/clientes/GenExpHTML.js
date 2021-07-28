import React from "react";
import WN from "@material-ui/icons/Warning"
export default (props) => {
    const {c,refRow} = props
    //const {openExpireDash, opExp} = c.state
    const [openExpireDash, setOpenExpireDash] = React.useState(null)
    const [opExp, setOpExp] = React.useState(0);
        
  return (<><WN color='error' 
                      aria-label="edit"
                      aria-owns={openExpireDash ? "profile-menu-list-grow" : null}
                      aria-haspopup="true"
                      justIcon 
            />
            <div ref={refRow} style={{position: 'absolute', opacity:0, paddingTop:15, backgroundColor: 'red', zIndex:9999, alignContent:'center', height: 50, borderRadius: 20, boxShadow: "4px 4px 4px 2px rgba(1, 1, 1, 0.2)",  borderWidth: 0.5, borderColor: 'black', elevation: 2}}>
                    <WN color="inherit"  
                    /> <i style={{color:'white'}} >¡ADVERTENCÍA! Él número de cliente presenta un adeudo, favor de hacer el pago.</i>
            </div>
    </>)

}