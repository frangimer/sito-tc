window.addEventListener("scroll", function() {
    let navbar = document.querySelector("header");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

window.addEventListener('load', function() {
  const isMobile = window.innerWidth <= 480;  // Verifica se la larghezza è inferiore a 480px (smartphone)
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;  // Verifica se la larghezza è tra 481px e 768px (tablet)
  
  let stylesheet = document.getElementById('stylesheet');
  
  if (isMobile) {
    stylesheet.setAttribute('href', 'mobile.css');  // Carica il CSS per dispositivi mobili
  } else if (isTablet) {
    stylesheet.setAttribute('href', 'tablet.css');  // Carica il CSS per tablet
  } else {
    stylesheet.setAttribute('href', 'desktop.css');  
  }
});

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

let slideIndex = 1;
showSlides(slideIndex);

// Aggiungi un intervallo per cambiare automaticamente la diapositiva ogni 2 secondi
setInterval(function() {
    plusSlides(1);  // Passa alla diapositiva successiva
}, 6000);  // 2000 millisecondi = 2 secondi

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    // Prendiamo tutti gli elementi HTML che hanno come classe "mySlides"
    let slides = document.getElementsByClassName("mySlides");

    // Se il valore di n è superiore al numero totale di immagini, torniamo alla prima
    if (n > slides.length) {
        slideIndex = 1;
    }
    // Se il valore di n è inferiore a 1, torniamo all'ultima diapositiva
    if (n < 1) {
        slideIndex = slides.length;
    }

    // Nascondiamo tutte le diapositive
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Mostriamo la diapositiva corretta
    slides[slideIndex - 1].style.display = "block";
}

document.getElementById("bottone_prenota").addEventListener("click", function() {
    window.location.href = "https://tcrionero.wansport.com"; // Sostituisci con il tuo URL
});

document.addEventListener("DOMContentLoaded", function () {
    // Funzione per scrollare verso la mappa quando si clicca su "Dove siamo"
    document.getElementById("link_mappa").addEventListener("click", function (event) {
        event.preventDefault(); // Evita il comportamento predefinito del link

        const target = document.getElementById("mappa"); // Assicurati che l'ID "mappa" esista
        const offset = 100; // Offset per il margine

        if (target) {
            // Calcola la posizione di destinazione e scrolla
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth" // Abilita lo scroll con effetto di scorrimento dolce
            });
        }
    });
});

document.getElementById("contact").addEventListener("click", function() {
    window.location.href = "contatti.html"; // Sostituisci con il tuo URL
});

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previene il comportamento predefinito del form

    // Ottieni i dati del modulo
    const formData = new FormData(document.getElementById("contact-form"));

    // Crea un oggetto con i dati del modulo
    const data = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Invia i dati al server Node.js
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert("Messaggio inviato con successo!");
            // Pulisci il modulo
            document.getElementById("contact-form").reset();
        } else {
            alert("Errore durante l'invio del messaggio. Riprova.");
        }
    })
    .catch(error => {
        alert("Errore di rete. Riprova più tardi.");
        console.error(error);
    });
});
