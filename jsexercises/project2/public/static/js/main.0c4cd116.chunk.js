(this.webpackJsonpreactexercises=this.webpackJsonpreactexercises||[]).push([[0],{142:function(e,t){},152:function(e,t,s){},154:function(e,t,s){"use strict";s.r(t);var n=s(0),r=s(10),o=s(64),i=s(65),a=s(90),c=s.n(a),A=s(193),g=s(95),l=s.n(g),h=s(186),f=s(190),m=s(156),j=s(191),b=s(5),u=function(e){var t=e.showIcon;return Object(b.jsx)(h.a,{position:"fixed",children:Object(b.jsxs)(f.a,{color:"primary",title:"Sample Toolbar",children:[Object(b.jsx)(m.a,{variant:"h6",color:"inherit",children:"Chat it Up!"}),!0===t&&Object(b.jsx)("section",{style:{height:90,width:90,marginLeft:"auto"},children:Object(b.jsx)(j.a,{onClick:function(){return e.viewDialog()},children:Object(b.jsx)(l.a,{style:{color:"white",height:70,width:70}})})})]})})},d=s(192),x=function(e){return Object(b.jsx)("div",{style:{content:"",position:"absolute",bottom:"-12px",left:"".concat(e.alignTriangle),borderWidth:"15px 15px 0",borderStyle:"solid",borderColor:"".concat(e.color," transparent")}})},v=function(e){var t=e.className;return Object(b.jsxs)("div",{className:t,style:{backgroundColor:e.color},children:[Object(b.jsxs)("div",{style:{marginBottom:"20%"},children:[Object(b.jsxs)("div",{style:{fontSize:"10px",float:"right"},children:[Object(b.jsxs)("div",{children:[" Room: ",e.user.roomname]}),"@: ",e.user.time]}),Object(b.jsxs)("div",{style:{float:"left",fontWeight:"bolder"},children:[e.user.from,":",Object(b.jsx)("div",{})]})]}),Object(b.jsx)("br",{}),Object(b.jsxs)("span",{style:{fontWeight:"bold"},children:[" ",e.user.text]}),Object(b.jsx)("br",{}),Object(b.jsx)(x,{color:e.user.colour,alignTriangle:e.alignTriangle})]})},C=function(e){var t=Object(n.useRef)(null),s=e.msg;Object(n.useEffect)((function(){t.current.scrollIntoView(!0)}),[]);var r="left",o="10%";return e.chatName===e.msg.from&&(r="right",o="80%"),Object(b.jsxs)("div",{children:[Object(b.jsx)(d.a,{ref:t,children:Object(b.jsx)(v,{user:s,color:s.colour,className:r,alignTriangle:o})}),Object(b.jsx)("p",{})]})},w=s(196),Q=s(197),y=s(199),O=s(198),B=s(96),P=s.n(B),D=(s(152),s(205)),N=s(194),I=s(195),T=s(203),E=s(200),p=s(201),k=s(202),z=s(97),J=Object(z.a)({typography:{useNextVariants:!0},palette:{common:{black:"#000",white:"#fff"},background:{paper:"#fff",default:"#fafafa"},primary:{light:"rgba(241, 129, 100, 1)",main:"rgba(229, 103, 62, 1)",dark:"rgba(246, 93, 10, 1)",contrastText:"#fff"},secondary:{light:"rgba(211, 108, 87, 1)",main:"rgba(214, 69, 69, 1)",dark:"rgba(207, 3, 3, 1)",contrastText:"#fff"},error:{light:"rgba(252, 77, 77, 1)",main:"rgba(255, 0, 0, 1)",dark:"rgba(170, 0, 0, 1)",contrastText:"#fff"},text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"}}}),F=function(){var e=Object(n.useReducer)((function(e,t){return Object(i.a)(Object(i.a)({},e),t)}),{messages:[],status:"",showjoinfields:!0,alreadyexists:!1,chatName:"",roomName:"",typingMsg:"",isTyping:!1,message:"",looged_in:!1,showimg:!0,roomList:[],userList:[],showCardMessage:!1}),t=Object(o.a)(e,2),s=t[0],r=t[1];Object(n.useEffect)((function(){a()}),[]);var a=function(){var e=c()();e.on("nameexists",l),e.on("welcome",f),e.on("someonejoined",m),e.on("someoneleft",m),e.on("someoneistyping",h),e.on("newmessage",x),e.on("tooall",d),e.on("roomlist",g),r({socket:e})},g=function(e){r({roomList:e.roomdetails})},l=function(e){r({status:e.text})},h=function(e){e.from!==s.chatName&&r({typingMsg:e.text})},f=function(e){var t=s.messages;t.push(e),r({messages:t,users:e.users,showjoinfields:!1,alreadyexists:!1,looged_in:!0,showCardMessage:!0,showimg:!1})},m=function(e){var t=s.messages;t.push(e),r({messages:t,users:e.users,showjoinfields:!1,alreadyexists:!1})},d=function(e){r({userList:e.roomdetails})},x=function(e){m(e),r({typingMsg:""})},v=function(e){r({roomName:e.target.value})},B=Object(n.useState)(!1),z=Object(o.a)(B,2),F=z[0],H=z[1];return Object(b.jsxs)(A.a,{theme:J,children:[Object(b.jsxs)("div",{children:[Object(b.jsx)(u,{viewDialog:function(){return H(!0)},showIcon:s.looged_in}),Object(b.jsxs)(D.a,{open:F,onClose:function(){return H(!1)},style:{margin:20},children:[Object(b.jsx)(N.a,{style:{textAlign:"center"},children:"Who's On?"}),Object(b.jsx)(I.a,{children:Object(b.jsx)(w.a,{children:Object(b.jsx)(Q.a,{children:s.userList.map((function(e){return Object(b.jsxs)(O.a,{children:[Object(b.jsx)(y.a,{style:{width:"25%"},children:Object(b.jsx)(j.a,{style:{color:e.color,marginTop:"15%"},children:Object(b.jsx)(P.a,{})})}),Object(b.jsx)(y.a,{style:{fontFamily:"sans-serif",fontSize:"100%"},children:Object(b.jsxs)(I.a,{children:[e.name," is in room ",e.room]})})]},e.name)}))})})})]})]}),!0===s.showimg&&Object(b.jsx)("div",{style:{marginTop:"20%",marginBottom:"10%"},children:Object(b.jsx)("img",{src:"data:image/png;base64,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",alt:"Chat LOGO",style:{height:"20%",width:"20%",justifyContent:"center",marginTop:"2%",marginLeft:"40%",position:"inherit"}})}),s.showjoinfields&&Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{style:{border:"solid",padding:"3vw",margin:"2vw",borderColor:"rgba(246, 93, 10, 1)",position:"relative"},children:Object(b.jsx)(T.a,{onChange:function(e){r({chatName:e.target.value,status:""})},label:"Chat Name",variant:"outlined",autoFocus:!0,required:!0,value:s.chatName,error:""!==s.status,helperText:s.status,style:{width:"100%"}})}),Object(b.jsxs)("div",{style:{border:"solid",padding:"3vw",margin:"2vw",borderColor:"rgba(246, 93, 10, 1)"},children:[Object(b.jsx)("div",{style:{fontFamily:"sans-serif",fontWeight:"bold",color:"rgba(246, 93, 10, 1)",marginBottom:"5%"},children:"Join Existing or Create Room to Join"}),Object(b.jsx)("div",{children:s.roomList.map((function(e){return Object(b.jsxs)("span",{children:[e," ",Object(b.jsx)("input",{label:"Primary",type:"radio",name:"Radio",checked:s.roomName===e,value:e,onChange:v})]},e)}))}),Object(b.jsx)(T.a,{onChange:function(e){r({roomName:e.target.value})},label:"Create Room",variant:"outlined",required:!0,value:s.roomName,style:{width:"100%",marginTop:"5%"}}),Object(b.jsx)("p",{})]}),Object(b.jsx)("div",{style:{padding:"5vw",margin:"1vw",borderColor:"rgba(246, 93, 10, 1)"},children:Object(b.jsx)(E.a,{variant:"contained","data-testid":"submit",color:"primary",style:{width:"100%",padding:"3vw"},onClick:function(){s.socket.emit("join",{chatName:s.chatName,roomName:s.roomName})},disabled:""===s.chatName||""===s.roomName,children:"Join"})})]}),!0===s.showCardMessage&&Object(b.jsx)(p.a,{style:{marginTop:"20%",marginBottom:"25%"},children:Object(b.jsx)(k.a,{children:Object(b.jsx)("div",{className:"usersList",style:{display:"flex",alignItems:"flex-start",flexDirection:"column",top:"20%"},children:s.messages.map((function(e,t){return Object(b.jsx)(C,{msg:e,chatName:s.chatName},t)}))})})}),!0===s.showCardMessage&&Object(b.jsx)(p.a,{style:{position:"fixed",bottom:"0",right:"2%",left:"2%"},children:Object(b.jsx)(k.a,{children:!s.showjoinfields&&Object(b.jsx)(T.a,{onChange:function(e){r({message:e.target.value}),!1===s.isTyping&&(s.socket.emit("typing",{from:s.chatName},(function(e){})),r({isTyping:!0}))},placeholder:"type message here",helperText:s.typingMsg,autoFocus:!0,value:s.message,onKeyPress:function(e){return"Enter"===e.key?void(""!==s.message&&(s.socket.emit("message",{from:s.chatName,text:s.message},(function(e){})),r({isTyping:!1,message:""}))):null},color:"primary"})})})]})};var H=function(){return Object(b.jsx)(F,{})},M=s(98);Object(r.render)(Object(b.jsx)(M.a,{children:Object(b.jsx)(H,{})}),document.querySelector("#root"))}},[[154,1,2]]]);