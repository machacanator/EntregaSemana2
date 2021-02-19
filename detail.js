let homeworld=[];
let films=[];
let species=[];
let vehicles=[];
let starships=[];

//Funcion para cambiar a la pagina de Detalles
function cambiarADetalles(person){
    let $listPage=document.querySelector(".card-list");
    let $descriptionPage=document.querySelector(".description-list");
    let $filmscard;
    let $speciescard;
    let $vehiclescard;
    let $starshipscard;
    let $title;

    
    //Cambiamos de pagina ocultaando las paginas de listas y mostramos la de detalles 
    $listPage.style.display='none';
    $descriptionPage.style.display='flex';
    document.querySelector("html").style.height=window.innerHeight+"px";
    document.querySelector("body").style.height=window.innerHeight+"px";

    //En el caso de la masa y la altura si no existen la ponemos en unknown, sino ponemos el numero mas kg/cm respectivamente
    let height="unknown";
    let mass="unknown";
    if(person.height!="unknown")
        height=person.height+" cm";
    if(person.mass!="unknown")
        mass=person.mass+" kg";
    
    //Insertamos el HTML    
    $descriptionPage.innerHTML=
        "<ul class=\"description-info\">"+
            "<li class=\"description-info__name\">"+person.name+"</li>"+
            "<li class=\"description-info__row\"><span class=\"description-info__height\">Height: "+height+"</span><span class=\"description-info__mass\">Mass: "+mass+"</span><span class=\"description-info__hair-color\">Hair: "+person.hair_color+"</span></li>"+
            "<li class=\"description-info__row\"><span class=\"description-info__skin-color\">Skin: "+person.skin_color+"</span><span class=\"description-info__eye-color\">Eyes: "+person.eye_color+"</span><span class=\"description-info__gender\">Gender: "+person.gender+"</span></li>"+
            "<li class=\"description-info__row\"><span class=\"description-info__birth-year\">Birth Year: "+person.birth_year+"</span><span class=\"description-info__homeworld\">Planet: "+homeworld[0]+"</span></li>"+
            "<li class=\"description-info__edition-row\"><span class=\"description-info__created\">Created: "+person.created+"</span><span class=\"description-info__edited\">Edited: "+person.edited+"</span><span class=\"description-info__url\">URL: "+person.url+"</span></li>"+
        "</ul>"+
        "<ul class=\"description-list-extra films\"><span class=\"description-list-extra__title\">Peliculas</span><div class=\"description-list-extra__description\">"+concatArray(films)+"</div></ul>"+
        "<ul class=\"description-list-extra species\"><span class=\"description-list-extra__title\">Especies</span><div class=\"description-list-extra__description\">"+concatArray(species)+"</div></ul>"+
        "<ul class=\"description-list-extra vehicles\"><span class=\"description-list-extra__title\">Vehículos</span><div class=\"description-list-extra__description\">"+concatArray(vehicles)+"</div></ul>"+
        "<ul class=\"description-list-extra starships\"><span class=\"description-list-extra__title\">Naves espaciales</span><div class=\"description-list-extra__description\">"+concatArray(starships)+"</div></ul>";

    //Asignamos a las variables su HMTL correspondiente
    $filmscard=document.querySelector(".description-list-extra.films");
    $speciescard=document.querySelector(".description-list-extra.species");
    $vehiclescard=document.querySelector(".description-list-extra.vehicles");
    $starshipscard=document.querySelector(".description-list-extra.starships");
    $title=document.querySelector(".description-list-extra__title");
    
    //Hacemos que por ejemplo la card de peliculas tenga una altura acorde al numero de peliculas que contenga
    $filmscard.style.height=(100+films.length*30)+"px";
    $speciescard.style.height=(100+species.length*30)+"px";
    $vehiclescard.style.height=(100+vehicles.length*30)+"px";
    $starshipscard.style.height=(100+starships.length*30)+"px";

    //Cambiamos la altura del html, el body y la descriptionlist una vez conocemos la altura de todo el contenido de la pagina
    $descriptionPage.style.height=getPxValue(getComputedStyle(document.querySelector(".description-info")).height)+getPxValue(getComputedStyle($filmscard).height)+getPxValue(getComputedStyle($speciescard).height)+getPxValue(getComputedStyle($vehiclescard).height)+getPxValue(getComputedStyle($starshipscard).height)+7*4+"px";
    document.querySelector("html").style.height=(getPxValue(getComputedStyle(document.querySelector(".header")).height) + getPxValue(getComputedStyle($descriptionPage).height)+200)+"px";
    document.querySelector("body").style.height=(getPxValue(getComputedStyle(document.querySelector(".header")).height) + getPxValue(getComputedStyle($descriptionPage).height)+200)+"px";

    //Hacemos que el texto del listado de peliculas se alinee verticalmente haciendo "line-height = tamaño de card - tamaño de titulo"
    // $filmscard.querySelector(".description-list-extra__description").style.lineHeight=(getPxValue(getComputedStyle($filmscard).height)-getPxValue(getComputedStyle($title).height))+"px";
    // $speciescard.querySelector(".description-list-extra__description").style.lineHeight=(getPxValue(getComputedStyle($starshipscard).height)-getPxValue(getComputedStyle($title).height))+"px";
    // $vehiclescard.querySelector(".description-list-extra__description").style.lineHeight=(getPxValue(getComputedStyle($vehiclescard).height)-getPxValue(getComputedStyle($title).height))+"px";
    // $starshipscard.querySelector(".description-list-extra__description").style.lineHeight=(getPxValue(getComputedStyle($starshipscard).height)-getPxValue(getComputedStyle($title).height))+"px";
}

//Funcion para concatenar nuestros arrays de peliculas por ejemplo y convertirlo a una lista de texto HTML
function concatArray(array){
    result="";

    array.forEach(string => {
        if(result=="")
            result=result+string;
        else
            result=result+"<br> "+string;
    });

    if (result=="") result="None"; 

    return result;
}

//Funcion asincrona para pedir un array de URLs y devolver el array de nombre o titulos dependiendo de si es una pelicula lo que buscamos u otra cosa
async function requestArray(urls, isFilm){ /*Peticion GET de un array y solo nos quedamos con los nombres*/
    let request;
    let data;
    let result=[];

    for (url of urls){
        request= await fetch(url);
        if(request.status==200){
            data=await request.json();
            if(isFilm)
                result.push(data.title);
            else    
                result.push(data.name);
        }else{
            alert("Error, no se ha podido conectar con la API");
        }
    }

    return await result;
}

//Funcion asincrona para realizar todas las peticiones que necesitamos que son planeta natal, las peliculas en las que ha estado, vehiculos que ha usado ...
async function requestAll (person){
    homeworld=await requestArray([person.homeworld],false);
    films=await requestArray(person.films,true);
    species=await requestArray(person.species,false);
    vehicles=await requestArray(person.vehicles,false);
    starships=await requestArray(person.starships,false);
}