// NOMBRE QUE PUEDE ENTRAR
const nombrePermitido = "quieromuchoafabian";
let intentosFallidos = 0;
const maxIntentos = 10;


// ELEMENTOS
const acceso = document.getElementById("acceso");
const inicio = document.getElementById("inicio");
const historia = document.getElementById("historia");
const recuerdos = document.getElementById("recuerdos");
const regalosSection = document.getElementById("regalos");
const seccionFinal = document.getElementById("final");

const inputNombre = document.querySelector("#acceso input");
const botonEntrar = document.querySelector("#acceso button");


// BOTONES DE NAVEGACIÓN
const btnComenzar = document.getElementById("btnComenzar");
const btnHistoria = document.getElementById("btnHistoria");
const btnRecuerdos = document.getElementById("btnRecuerdos");
const btnRegalos = document.getElementById("btnRegalos");


// OCULTAR TODO MENOS ACCESO
inicio.style.display = "none";
historia.style.display = "none";
recuerdos.style.display = "none";
regalosSection.style.display = "none";
seccionFinal.style.display = "none";

function crearBrillos(elemento) {

    const rect = elemento.getBoundingClientRect();

    for (let i = 0; i < 6; i++) {

        const brillo = document.createElement("div");
        brillo.textContent = "✨";
        brillo.classList.add("brillo");

        brillo.style.left = rect.left + Math.random() * rect.width + "px";
        brillo.style.top = rect.top + Math.random() * rect.height + "px";

        document.body.appendChild(brillo);

        setTimeout(() => {
            brillo.remove();
        }, 1000);

    }

}


// BOTÓN ENTRAR
botonEntrar.addEventListener("click", function () {

    const nombreIngresado = inputNombre.value.trim().toLowerCase();

    if (nombreIngresado === "") {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Escribe tu nombre primero ✍️",
            confirmButtonColor: "#ff4d6d"
        });
        return;
    }

    if (nombreIngresado === nombrePermitido) {

        Swal.fire({
            icon: "success",
            title: "✅ Contraseña correcta",
            text: "¡Bienvenida! Prepárate para lo que viene...",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#ff4d6d",
            allowOutsideClick: false
        }).then(() => {
            acceso.style.display = "none";
            inicio.style.display = "flex";
            inicio.classList.add("animacion-zoom");
        });

    } else {

        intentosFallidos++;
        const restantes = maxIntentos - intentosFallidos;

        if (intentosFallidos >= maxIntentos) {
            Swal.fire({
                icon: "info",
                title: "La contraseña era obvia...",
                text: "La contraseña es: " + nombrePermitido,
                confirmButtonText: "Es que te cuesta mucho decirlo",
                confirmButtonColor: "#ff4d6d"
            });
            intentosFallidos = 0;
        } else {
            Swal.fire({
                icon: "error",
                title: "Esa no es, piensa bien",
                text: "Te quedan " + restantes + " intentos. A los 10 se te mostrará la contraseña que es la más obvia del mundo",
                confirmButtonColor: "#ff4d6d"
            });
        }

    }

});


// COMENZAR → HISTORIA
const textoCompleto = "No se en que momento te comence a conciderar parte importante en mi vida, ni cuando te termine llamando MEJOR AMIGA de la nada. Eres una gran persona y sinceramente me siento feliz de saber que cuento contigo para cualquier locura que se me ocurra. Manu, hoy es tu Cumpleaños mrk, cada dia te estas poniendo mas vieja... cuando menos pienses ya te van a estar diciendo señora en la calle.... Se va a sentir feo pero bueno asi es la vida tu solo tienes que tragar y seguir caminando como si no hubieras escuchado nada y cuando llegues a la casa ya ponerte a llorar JAJJAJA, todavia falta mucho pero aqui estoy yo para prepararte mentalmente para todo ese proseso... No me queda mas que decearte un feliz Cumpleaños y desearte muchas bendiciones (en tu cara como te gustan) y todas esas cosas que la gente normal dice cuando alguien esta cumpliendo años, yo no te las digo porque me imagino que te cansaras de escuchar lo mismo y tu sabes hay que ser diferente al resto JAJAJJAJAJ ya no se que mas decir mrk me pase de poeta.... Feliz debes estar de tenerme a mi para joderte la vida, te cuesta aceptarlo pero yo se que si, y bueno cualquier cosa sabes que yo estoy aqui de vago y que cuentas conmigo... Y nuevamente FELIZ CUMPLEAÑOS te quiero arto manu y esta vez no estoy borracho este momento es especial asi que deje mi orgullo a un lado para decirtelo......";

function efectoEscribir(elemento, texto, velocidad, callback) {
    let i = 0;
    elemento.textContent = "";
    elemento.classList.add("cursor-escribiendo");

    function escribir() {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        } else {
            elemento.classList.remove("cursor-escribiendo");
            if (callback) callback();
        }
    }

    escribir();
}

// AUDIOS
const audioHistoria = new Audio("audio/historia.mp3");
audioHistoria.loop = true;

const audioRegalos = new Audio("audio/cantantedelgeto.mp3");
audioRegalos.loop = true;

btnComenzar.addEventListener("click", function () {

    inicio.style.display = "none";
    historia.style.display = "flex";

    historia.classList.remove("animacion-derecha");
    void historia.offsetWidth;
    historia.classList.add("animacion-derecha");

    // Reproducir audio historia
    audioHistoria.currentTime = 0;
    audioHistoria.play();

    const textoHistoria = document.getElementById("textoHistoria");
    const btnHistoriaEl = document.getElementById("btnHistoria");
    btnHistoriaEl.style.display = "none";

    efectoEscribir(textoHistoria, textoCompleto, 55, function () {
        btnHistoriaEl.style.display = "inline-block";
        btnHistoriaEl.classList.add("animacion-zoom");
    });

});


// HISTORIA → RECUERDOS
btnHistoria.addEventListener("click", function () {

    // Detener audio historia
    audioHistoria.pause();
    audioHistoria.currentTime = 0;

    historia.style.display = "none";
    recuerdos.style.display = "flex";

    recuerdos.classList.remove("animacion-caida");
    void recuerdos.offsetWidth;
    recuerdos.classList.add("animacion-caida");

});


// RECUERDOS → REGALOS
btnRecuerdos.addEventListener("click", function () {

    recuerdos.style.display = "none";
    regalosSection.style.display = "flex";

    regalosSection.classList.remove("animacion-zoom");
    void regalosSection.offsetWidth;
    regalosSection.classList.add("animacion-zoom");

});


// REGALOS → FINAL
btnRegalos.addEventListener("click", function () {

    regalosSection.style.display = "none";
    seccionFinal.style.display = "flex";

    seccionFinal.classList.remove("animacion-giro");
    void seccionFinal.offsetWidth;
    seccionFinal.classList.add("animacion-giro");

    document.body.classList.add("fondo-fiesta");

    // Reproducir audio final
    audioRegalos.currentTime = 0;
    audioRegalos.play();

    confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
    });

    lanzarConfeti();

});



// REGALOS INTERACTIVOS

const regalos = document.querySelectorAll(".regalo");

regalos.forEach((regalo, index) => {

    regalo.addEventListener("click", function () {

        // animacion de abrir regalo
        regalo.classList.add("abriendo");

        // cambiar emoji a caja abierta
        regalo.textContent = "📦";

        setTimeout(() => {


            // REGALO 1 - CARTA
            if (index === 0) {

                Swal.fire({
                    title: "cartita sacada de google",
                    imageUrl: "img/happy.jpeg",
                    imageWidth: 400,
                    imageAlt: "Carta especial",
                    confirmButtonText: "siguiente"
                });

            }

            // REGALO 2 - FOTO
            if (index === 1) {

                Swal.fire({
                    title: "no se quienes son las de atras, me dio miedo lo realistas que son",
                    imageUrl: "img/manuxmia.jpeg",
                    imageWidth: 400,
                    imageAlt: "no se quienes son las de atras, me dio miedo lo realistas que son",
                    confirmButtonText: "tu foto favorita"
                });

            }

            // REGALO 3 - VIDEO
            if (index === 2) {

                Swal.fire({
                    title: "video del bichoo, esta quemado pero es perfecto",
                    html: `
                <video width="100%" controls autoplay>
                    <source src="video/elbichosiuuuu.mp4" type="video/mp4">
                </video>
                `,
                    confirmButtonText: "Otro regalo"
                });

            }

            // REGALO FINAL
            if (index === 3) {

                Swal.fire({
                    title: "🎉 El regalo final",
                    text: "¡Feliz cumpleaños Manuela!",
                    confirmButtonText: "Sigueeeeee"
                });
                confetti({
                    particleCount: 300,
                    spread: 200,
                    startVelocity: 45,
                    scalar: 1.2
                });


                lanzarConfeti();

            }
        }, 600);

    });

});

function lanzarConfeti() {

    const duracion = 5 * 1000; // 5 segundos
    const tiempoFinal = Date.now() + duracion;

    const colores = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#ef476f"];

    (function frame() {

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 80,
            origin: { x: 0 },
            colors: colores
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 80,
            origin: { x: 1 },
            colors: colores
        });

        if (Date.now() < tiempoFinal) {
            requestAnimationFrame(frame);
        }

    })();

}


// BOTÓN REINICIAR
const btnReiniciar = document.getElementById("btnReiniciar");

btnReiniciar.addEventListener("click", function () {
    location.reload();
});