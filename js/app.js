document.addEventListener('DOMContentLoaded', function () {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    //SELECIONANDO LOS ELEMENTOS DE LA INTERFAZ
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    //Asignando evento de cada 1 
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        resetFormulio()

    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex')
        spinner.classList.remove('hidden')
        setTimeout(() => {
            spinner.classList.remove('flex')
            spinner.classList.add('hidden')
            resetFormulio();
        
        //creando una alerta 
         
        const alertaexito = document.createElement('P')  
         alertaexito.classList.add('bg-green-500', 'text-white', 'p-2',
          'text-center', 'rounded-lg',
           'mt-10', 'font-bold', 'text-sm', 'uppercase')
           alertaexito.textContent = 'Message sent successfully'
           
           formulario.appendChild(alertaexito)
           setTimeout(() => {

            alertaexito.remove();


           }, 3000)

        }, 3000)

    }


    function validar(e) {

        if (e.target.value.trim() === '') {
            mostrarAlerta(`The field ${e.target.id} is required`, e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;

        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('The email is not valid', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);


        //ASIGNANDO LOS VALORES
        email[e.target.name] = e.target.value.trim().toLowerCase();


        //COMPROBANDO OBJETO DE EMAIL
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        //ESTO COMPRUEBA SI YA EXISTE UNA ALERTA 
        limpiarAlerta(referencia)

        //GENERANDO ALERTA EN HTML
        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        error.textContent = mensaje

        //APLICANDO ERROR EN EL FORMULARIO
        referencia.appendChild(error)

    }

    function limpiarAlerta(referencia) {
        //COMPROBANDO SI YA EXISTE UNA ALERTA
        const alerta = referencia.querySelector('.bg-red-600')
        if (alerta) {
            alerta.remove();
        }

    }


    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

        const resultado = regex.test(email)
        return resultado;

    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {

            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;


        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }


    function resetFormulio() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset()
        comprobarEmail()
    }

});