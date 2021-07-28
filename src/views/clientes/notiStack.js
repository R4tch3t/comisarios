
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

//export default (label,color,icon,place) =>{
class Notifications extends React.Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        if(this.props.bandS){
            this.notify(this.props.place,this.props.color, this.props.icon)
        }
    }
notify = (place, color,icon) => {
    //var color = Math.floor(Math.random() * 5 + 2);
    //var color = 2
    try{
        var type;
        switch (color) {
        case 1:
            type = "primary";
            break;
        case 2:
            type = "success";
            break;
        case 3:
            type = "danger";
            break;
        case 4:
            type = "warning";
            break;
        case 5:
            type = "info";
            break;
        default:
            break;
        }
        switch (icon) {
        case 0:
            icon = "icon-alert-circle-exc";
            break;
        case 1:
            icon = "icon-send";
            break;
        case 2:
            icon = "icon-upload";
            break;
        case 3:
            icon = "warning";
            break;
        case 4:
            icon = "info";
            break;
        default:
            break;
        }
        var options = {};
        options = {
        place: place,
        message: (
            <div>
            <div>
                {this.props.label}
            </div>
            </div>
        ),
        type: type,
        icon: "tim-icons "+icon,
        autoDismiss: 0
        };
        this.refs.notificationAlert.notificationAlert(options);
    }catch(e){
        console.log(e)
    }
  };
  
  render() {
    return (
      <>
        <div className="react-notification-alert-container">
            <NotificationAlert ref="notificationAlert" />
        </div>
      </>
      )
}
}
export default Notifications