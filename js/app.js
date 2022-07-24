// primero necesito crear mis variables 
//necesito seleccionar el formulario y todos mis inputs para validarlos

const formulario = document.querySelector('#enviar-mail')

const email= document.querySelector('#email')
const asunto= document.querySelector('#asunto')
const mensaje= document.querySelector('#mensaje')

const btnEnviar = document.querySelector('#enviar')



document.addEventListener('DOMContentLoaded', iniciarApp)
email.addEventListener('blur', validarFormulario)
asunto.addEventListener('blur', validarFormulario)
mensaje.addEventListener('blur', validarFormulario)


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
        error.remove()

        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')
        
    }
    else {
        e.target.classList.remove('border', 'border-green-500')
        e.target.classList.add('border', 'border-red-500')
        mostrarError('Todos los campos son obligatorios')
    }

    if( e.target.type==='email' ) {
        const expresionRegluar= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if( expresionRegluar.test( e.target.value )){

            const error= document.querySelector('p.error')
            error.remove()
        
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
        }

        else{
            mostrarError('El email no es valido')
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
        }
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


