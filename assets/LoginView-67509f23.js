import{r,u as b,i as d,o as w,a as x,b as k,c as T,d as V,e as o,w as m,f as u,v as p,F as y,g as B,h as L}from"./index-3b3b4d44.js";import{_}from"./Vector-6ae52742.js";import{_ as N}from"./img-13745c53.js";const E={class:"container pt-5 pt-md-7"},O={class:"row"},S=o("div",{class:"col-6 me-5 d-none d-md-block"},[o("h1",{class:"h2 Baloo-Thambi fw-bold text-center"},[o("img",{src:_,alt:"Vector_img"}),B(" ONLINE TODO LIST")]),o("img",{src:N,alt:"Todolist_img",class:"d-block m-auto img-fluid"})],-1),$={class:"col"},C=L('<h2 class="h3 fw-bold mt-5 ps-2 d-none d-md-block">最實用的線上代辦事項服務</h2><div class="d-block d-md-none text-center"><h2 class="h1 Baloo-Thambi fw-bold text-center"><img src="'+_+'" alt="Vector_img"> ONLINE TODO LIST</h2><h3 class="fw-bold mt-3">最實用的線上代辦事項服務</h3></div>',2),D=["onSubmit"],I={class:"form-group pt-4"},U=o("label",{for:"loginEmail",class:"form-label"},"Email",-1),F={class:"form-group pt-4"},M=o("label",{for:"loginpassword",class:"form-label"},"密碼",-1),j={class:"d-flex col-4 pt-5 mx-auto flex-column"},q=o("input",{class:"btn btn-dark py-md-3",id:"loginBtn",type:"submit",value:"登入"},null,-1),z=["onClick"],J={__name:"LoginView",setup(R){const l=r(!0),n=b(),c=d("$swal");function h(){n.push("/signUp")}w(()=>{setTimeout(()=>{l.value=!1},1500)});const g="https://todoo.5xcamp.us/",f=d("axios"),s=r({user:{email:"",password:""}});function v(){f.post(`${g}users/sign_in`,s.value).then(e=>{c.fire({icon:"success",title:e.data.message,text:`歡迎${e.data.nickname}`,showConfirmButton:!1,timer:1500}),setTimeout(()=>{const t=e.headers.authorization,a=e.data.nickname;document.cookie=`todoToken=${t};  max-age=1200`,document.cookie=`username=${a}; max-age=1200`,n.push("/todolist")},1500)}).catch(e=>{c.fire({icon:"error",title:e.response.data.message,text:"帳號不存在或帳號密碼錯誤"})}),s.value={user:{email:"",password:""}}}return(e,t)=>{const a=x("VueLoading");return k(),T(y,null,[V(a,{active:l.value},null,8,["active"]),o("main",E,[o("div",O,[S,o("div",$,[C,o("form",{class:"container loginForm",onSubmit:m(v,["prevent"])},[o("div",I,[U,u(o("input",{type:"email",style:{height:"50px"},class:"form-control",id:"loginEmail",placeholder:"請輸入Email",required:"","onUpdate:modelValue":t[0]||(t[0]=i=>s.value.user.email=i)},null,512),[[p,s.value.user.email]])]),o("div",F,[M,u(o("input",{type:"password",style:{height:"50px"},class:"form-control",id:"loginpassword",placeholder:"請輸入密碼",required:"","onUpdate:modelValue":t[1]||(t[1]=i=>s.value.user.password=i)},null,512),[[p,s.value.user.password]])]),o("div",j,[q,o("input",{class:"btn py-md-3",id:"loginjoinBtn",type:"button",value:"註冊帳號",onClick:m(h,["prevent"])},null,8,z)])],40,D)])])])],64)}}};export{J as default};
