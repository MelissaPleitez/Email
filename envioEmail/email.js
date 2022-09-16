
//Declaracion de variables

const btnEnviar= document.querySelector('#enviar');
const email= document.querySelector('#email');
const asunto=document.querySelector('#asunto');
const mensaje=document.querySelector('#mensaje');
const formulario= document.querySelector('#formulario');

const eRegular= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const btnRest= document.querySelector('#resetn');

//Eventos:
eventosOne();

function eventosOne(){

    btnEnviar.addEventListener('DOMContentLoaded', bloquearBoton);

    email.addEventListener('blur',verificarRelleno);
    asunto.addEventListener('blur',verificarRelleno);
    mensaje.addEventListener('blur',verificarRelleno);

    formulario.addEventListener('submit', mostrarSpinner);

    btnRest.addEventListener('click', borrarFormu);
}

//Funciones:

//Funcion del boton bloqueado

function bloquearBoton(){

    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
    
    
}


//Funcion que contine la verificacion 

function verificarRelleno(e){


    //verificar si hay o no info en los inputs:
    
    if(e.target.value.length > 0){
        const errore=document.querySelector('p.error');

        if(errore){
            errore.remove();
        }

        e.target.classList.remove('border-2', 'border-rose-500',);
        e.target.classList.add('border-2', 'border-green-500',);
    }else{
        e.target.classList.remove('border-2', 'border-green-500',);
        e.target.classList.add('border-2', 'border-rose-500',);

      
        mensajeError("Todos los campos deben ser rellenados!");
     
        
    }

    //Verificanco correo:

    if(e.target.type==='email'){
        
        if(eRegular.test(e.target.value)){
        const errore=document.querySelector('p.error');
        if(errore){
            errore.remove();
        }
        

        e.target.classList.remove('border-2', 'border-rose-500',);
        e.target.classList.add('border-2', 'border-green-500',);
            
        }else{
            e.target.classList.remove('border-2', 'border-green-500',);
            e.target.classList.add('border-2', 'border-rose-500',);
            mensajeError("Email no valido");
        }
    }

    //activando boton:

    if(eRegular.test(email.value) !="" && asunto.value !="" && mensaje.value !=""){

        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }

    
}

//Funcion que contiene el mensaje de error

function mensajeError(mensaje){


     const mensajeCreado= document.createElement('p');
     mensajeCreado.innerHTML=mensaje;
     mensajeCreado.classList.add('border-2', 'border-rose-500','p-3','m-5','text-center', "error");

     const existe=document.querySelectorAll('.error');

     if(existe.length===0){
        formulario.appendChild(mensajeCreado);
     }

    

}




//funcion para agregar y quitar spinner

function mostrarSpinner(e){

    e.preventDefault();

    const spinner= document.querySelector('#spinner');
    spinner.style.display='flex';

    setTimeout(() => {

        spinner.style.display='none';

        const exito= document.createElement('p');
            exito.innerText="Enviado con exito!";
            exito.classList.add('text-center','p-2','m-3','text-lime-500','uppercase','font-bold');

            formulario.insertBefore(exito,spinner);

        setTimeout(() => {
                
                exito.remove();

                borrarFormu();
            

            }, 3000);
       
    }, 3000);
}


//borrar contenido de los input o reset them:

function borrarFormu(){
    
  formulario.reset();
  

  bloquearBoton();
}