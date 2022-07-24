// primero necesito crear mis variables 
//necesito seleccionar el formulario y todos mis inputs para validarlos

const formulario = document.querySelector('#enviar-mail')

const email= document.querySelector('#email')
const asunto= document.querySelector('#asunto')
const mensaje= document.querySelector('#mensaje')

const btnEnviar = document.querySelector('#enviar')
const expresionRegluar= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



document.addEventListener('DOMContentLoaded', iniciarApp)
email.addEventListener('blur', validarFormulario)
asunto.addEventListener('blur', validarFormulario)
mensaje.addEventListener('blur', validarFormulario)
formulario.addEventListener('submit', mensajeEnviado)


function iniciarApp(){
    btnEnviar.disabled= true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//e.target significa el input sobre el cual estamos escribiendo 

function validarFormulario(e){
    
    if( e.target.value.length > 0 ){ 
        //se me esta mostrando el mensaje de error asi que vamos a borrarlo
        //si hay un parrafo que contenga la clase de error eliminalo

        const error= document.querySelector('p.error')
        if(error){
            error.remove()

        }
        

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
        
    }
    else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if( e.target.type==='email' ) {
        

        if( expresionRegluar.test( e.target.value )){

            const error= document.querySelector('p.error')

            if(error){
                error.remove()
    
            }
        
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }

        else{
            mostrarError('El email no es valido')
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
        }
    }
         //HABLITAR BOTON 

    if(expresionRegluar.test( email.value ) && asunto.value !== "" && mensaje.value !== ""){

        btnEnviar.disabled= false
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')

    
    }
}


function mostrarError(mensaje){
    
    const mensajeError= document.createElement('p')
    mensajeError.textContent= mensaje
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'text-center', 'mt-10', 'error')
    

    //los mensajes del formulario se me estan repitiendo
    //verifico que la clase de error este y solamente en caso que no este agrego el mensaje al formulario

    const errores= document.querySelectorAll('.error')
    
    if( errores.length === 0 ){
        formulario.appendChild(mensajeError)

    }
}

  function mensajeEnviado(e){
    e.preventDefault()
    // el spinner esta oculto por defecto
    const spinner= document.querySelector('#spinner')
    spinner.style.display= 'flex'

    setTimeout(()=>{
        //despues de 3 segundos desaparece el spinner

        spinner.style.display= 'none'
        const parrafo = document.createElement('p')
        parrafo.textContent= 'Mensaje enviado correctamente'
        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'uppercase')
        
        //Insertar el mensaje
        formulario.insertBefore(parrafo, spinner)

        setTimeout(()=>{
            parrafo.remove()
            resetearFormulario()
            

        },3000)

       
        

    },2500)

    }

    function resetearFormulario(){

        formulario.reset()
        removerClases()
        iniciarApp()
    }

    function removerClases(){
        email.classList.remove('border', 'border-green-500')
        asunto.classList.remove('border', 'border-green-500')
        mensaje.classList.remove('border', 'border-green-500')
    }