let peopleList=[];

//Funcion para cambiar a la pagina de lista de personas
function cambiarALista(origen){
    let $header=document.querySelector(".header");
    let $welcome=document.querySelector(".welcome-card__container");
    let $listPage=document.querySelector(".card-list");
    let $descriptionPage=document.querySelector(".description-list");
    let $html=document.querySelector("html");
    let $body=document.querySelector("body");
    let $error=document.querySelector(".empty-list");


    if(origen=="home"){//Si venimos desde la pagina de home 
        $listPage.style.display='flex';

        if(peopleList.length*125>window.innerHeight){//Si el numero de personas es mas alto que la pantalla
            $html.style.height=(125*peopleList.length+getPxValue(getComputedStyle($header).height))+"px";
            $body.style.height=getComputedStyle($html).height;
            $listPage.style.height=(125*peopleList.length)+"px";

            peopleList.forEach((people,index)=>{/*Por alguna razon no me procesa bien si no copio codigo*/
                let mass=0;
                let height=0;
                if(people.mass!="unknown")
                    mass=people.mass+" kg";
                else    
                    mass="unknown";
                if(people.height!="unknown")
                    height=people.height+" cm";
                else    
                    height="unknown";
                
                $listPage.innerHTML=$listPage.innerHTML+
                    "<li class=\"card\" value="+index+">"+
                        "<span class=\"card__title\">"+people.name+"</span>"+
                        "<div class=\"info\">"+
                            "<span class=\"info__height\">Height: "+height+"</span>"+
                            "<span class=\"info__gender\">Gender: "+people.gender+"</span>"+
                            "<span class=\"info__mass\">Mass: "+mass+"</span>"+
                        "</div>"+
                    "</li>";
            
                    
                
            });
        }else if(peopleList.length>0){//Si el numero de personas a mostrar no ocupa mas que la pantalla
            $html.style.height=window.innerHeight+"px";
            $body.style.height=window.innerHeight+"px";
            $listPage.style.height=(125*peopleList.length)+"px";
            
            peopleList.forEach((people,index)=>{/*Por alguna razon no me procesa bien si no copio codigo*/
                let mass=0;
                let height=0;
                if(people.mass!="unknown")
                    mass=people.mass+" kg";
                else    
                    mass="unknown";
                if(people.height!="unknown")
                    height=people.height+" cm";
                else    
                    height="unknown";
                
                $listPage.innerHTML=$listPage.innerHTML+
                    "<li class=\"card\" value="+index+">"+
                        "<span class=\"card__title\">"+people.name+"</span>"+
                        "<div class=\"info\">"+
                            "<span class=\"info__height\">Height: "+height+"</span>"+
                            "<span class=\"info__gender\">Gender: "+people.gender+"</span>"+
                            "<span class=\"info__mass\">Mass: "+mass+"</span>"+
                        "</div>"+
                    "</li>";
            });

        }else{//Si la lista de personas esta vacia mostramos mensaje con boton de Reload
                        
            $html.style.height=window.innerHeight+"px";
            $body.style.height=window.innerHeight+"px";
            $listPage.style.height=window.innerHeight-getPxValue(getComputedStyle(document.querySelector(".header")).height)-getPxValue(getComputedStyle(document.querySelector(".footer")).height)-20+"px";
            $listPage.style.display="flex";

            
            
            $listPage.innerHTML=
                "<div class=\"empty-list-card__container\">"+
                    "<div class=\"empty-list-card\">"+
                        "<span class=\"empty-list-card__title\">The list appears to be empty</span>"+
                        "<span class=\"empty-list-card__description\">If you would like to try anoher attempt please press the Reload button below</span>"+
                        "<button class=\"empty-list-card__button\">Reload</button>"+
                    "</div>"+
                "</div>";

            $emptyButton=document.querySelector(".empty-list-card__button");

                
            $emptyButton.addEventListener("click",function(button){
                cambiarPaginaA(2);
                requestPeople(1).then(()=>{
                    $welcome.style.display="none";
                    cambiarALista("home");
                });
            });

            $emptyButton.addEventListener("mouseover", function (){
                $emptyButton.style.backgroundColor="red";
            });
            $emptyButton.addEventListener("mouseout", function (){
                $emptyButton.style.backgroundColor="chartreuse";
            });
        }

        document.querySelectorAll("ul li.card").forEach((card)=>{//Animaciones de las cards
            card.addEventListener("focus", function (){
                card.style.backgroundColor="blue";
            });
            card.addEventListener("mouseover", function (){
                card.style.backgroundColor="blue";
            });
            card.addEventListener("mouseout", function (){
                card.style.backgroundColor="white";
            });
            card.addEventListener("click", function (){
                requestAll(peopleList[card.value])
                .then(()=>{
                    cambiarPaginaA(3);
                    cambiarADetalles(peopleList[card.value]);
                    $welcome.style.display="none";
                });
            });
        });
    }else{ //Si venimos desde la pagina de detalles
        $descriptionPage.style.display='';
        $listPage.style.display='flex';
    }
    
}

async function requestPeople(index){ /*Peticion GET para obtener todas las personas de la lista de personas*/
    let request= await fetch("https://swapi.dev/api/people/?page="+index);

    if(request.status==200){
        let data=await request.json();
        peopleList=peopleList.concat(data.results);/*Por cada request dan 10 personas asi que las acumulamos hasta que no haya mas*/
        if(data.next!=null){
            await requestPeople(index+1);
        }
    }else{
        alert("Error, no se ha podido conectar con la API");
    }
}
