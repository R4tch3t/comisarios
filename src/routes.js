import Dashboard from "views/Dashboard.js";
import listaComisarios from "views/clientes/listaComisarios.js";
import addComisario from "views/clientes/addComisario.js";
import editComisario from "views/clientes/editComisario.js";
import Archivos from "views/archivos/archivos.js";
import Editar from "views/Editar";

var routes = [
  /*{
    path: "/dashboard",
    name: "Estadisticas",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },*/
  {
    path: "/lista",
    name: "Lista de Comisarios",
    icon: "tim-icons icon-notes",
    component: listaComisarios,
    layout: "/comisarios"
  },
  {
    path: "/agregar",
    name: "Registrar comisario",
    icon: "tim-icons icon-simple-add",
    component: addComisario,
    layout: "/comisarios"
  },
  {
    path: "/editar",
    name: "Editar comisario",
    icon: "tim-icons icon-pencil",
    component: editComisario,
    layout: "/comisarios"
  },
  {
    path: "/archivos",
    name: "Archivos en general",
    icon: "tim-icons icon-pencil",
    component: Archivos,
    layout: "/comisarios"
  },
  {
    path: "/perfil",
    name: "Perfil de usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: Editar,
    layout: "/comisarios"
  },
 /* {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/map",
    name: "Map",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/rtl-support",
    name: "RTL Support",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-world",
    component: Rtl,
    layout: "/rtl"
  }*/
];
export default routes;
