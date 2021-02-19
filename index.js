let pagina=1;

//Funcion global para cambiar la pagina en la que nos encontramos
function cambiarPaginaA(i){
    loadingMessage();
    pagina=i;
}

//Funcion global para sacar el valor de los estilos quitandole el px y quedandonos con el valor
function getPxValue(attribute){
    return parseFloat(attribute.split("px")[0]);
}

//Funcion global para insertar un mensaje de Cargando durante las peticiones
function loadingMessage(){
    document.querySelector("html").style.height=window.innerHeight+"px";
    document.querySelector("body").style.height=window.innerHeight+"px";
    document.querySelector(".card-list").style.display="none";
    document.querySelector(".description-list").style.display="none";
    document.querySelector(".welcome-card__container").style.display="flex";

    document.querySelector(".welcome-card__container").innerHTML=
        "<div class=\"welcome-card__container\">"+
            "<div class=\"welcome-card\">"+
                "<span class=\"welcome-card__title\">Loading ...</span>"+
            "</div>"+
        "</div>";

    document.querySelector(".welcome-card__title").style.marginBottom="0px";
}

//Funcion global para inicializar y sstablecer las acciones de los botones
function inicializarBotones(){
    $welcome=document.querySelector(".welcome-card__container");
    $listIcon=document.querySelector(".headerIcons__loginIcon");
    $logoIcon=document.querySelector(".headerSiteLogo");
    $homeIcon=document.querySelector(".headerIcons__menuIcon");
    $listPage=document.querySelector(".card-list");
    $descriptionPage=document.querySelector(".description-list");
    $emptyList=document.querySelector(".empty-list-card__button");
    $socialNetwork=document.querySelectorAll(".socialNetwork");

    //Funcion a la que llaman los botones al hacer click
    function iconProcedure(boton){
        switch (boton){
            case "list":{
                if(pagina==1){//Si queremos ir a lista desde home
                    cambiarPaginaA(2);
                    requestPeople(1).then(()=>{
                        $welcome.style.display="none";

                        cambiarALista("home");
                    });
                    
                }else if(pagina==3){//Si queremos ir a lista desde detalles
                    cambiarPaginaA(2);
                    requestPeople(1).then(()=>{
                        $welcome.style.display="none";
                        cambiarALista("detail");    
                    });
                    
                }else{//Si queremos ir a lista desde lista
                    alert("You are already on that page");
                }
                
            };
            break;
            default:{
                if(pagina!=1){//Si queremos ir a home desde lista o detalles
                    $descriptionPage.style.display="none";
                    $listPage.style.display="none";
                    document.querySelector("html").style.height=window.innerHeight+"px";
                    document.querySelector("body").style.height=window.innerHeight+"px";
                    cambiarPaginaA(1);
                    inicializarPagina();
                }else{//Si queremos ir a home desde home
                    alert("You are already on that page");
                }
                
            };
            break;
        }
        
    }

    //Listado clicks de los botones
    $listIcon.addEventListener("click",function(button){
        iconProcedure("list");
    });
    $logoIcon.addEventListener("click",function(button){
        iconProcedure("logo");
    });
    $homeIcon.addEventListener("click",function(button){
        iconProcedure("home");
    });
    $logoIcon.addEventListener("mouseover", function(){
        document.querySelectorAll(".headerSiteLogo__Text").forEach(element=>{
            element.style.color="white";
        });
    });
    $logoIcon.addEventListener("mouseout", function(){
        document.querySelectorAll(".headerSiteLogo__Text").forEach(element=>{
            element.style.color="black";
        });
    });

    $socialNetwork.forEach(network => {
        network.addEventListener("mouseover", function(){
            network.style.backgroundColor="blue";
            network.style.color="black";
        });
        network.addEventListener("mouseout", function(){
            network.style.backgroundColor="black";
            network.style.color="white";
        }); 
    });
}

//Funcion principal para inicializar la pagina
function inicializarPagina(){
    $welcome=document.querySelector(".welcome-card__container");

    $welcome.innerHTML=
        "<div class=\"welcome-card\">"+
            "<span class=\"welcome-card__title\">Welcome to Gaming Knights website</span>"+
            "<span class=\"welcome-card__description\">The theme of this website is:<u> Star Wars </u></span>"+
        "</div>";
    $welcome.style.dislay="flex";    
}

//Iniciamos la pagina cuando se haya cargado todo el html
document.onreadystatechange = function(){
    if(document.readyState === "complete"){
        inicializarPagina();
        inicializarBotones();
    }
}