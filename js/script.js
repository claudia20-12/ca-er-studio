// COLLEGAMENTI AI PORTFOLIO

document.querySelector("#link-professionale").href =
    "https://claudia20-12.github.io/portfolio/";

document.querySelector("#link-illustrazione").href =
    "https://claudia20-12.github.io/non-toccare-niente/";

// SALVA CONTATTO DELLO STUDIO

document.querySelector("#salva-contatto").addEventListener("click", () => {

    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "FN:CA. / ER. - Studio Creativo",
        "ORG:CA. / ER. - Studio Creativo",
        "EMAIL;TYPE=WORK:claudia.attenni.lavoro@gmail.com",
        "TEL;TYPE=CELL:+393313386131",
        "TEL;TYPE=CELL:+393663452810",
        "NOTE:WhatsApp Emiliano Reali: 3313386131 - WhatsApp Claudia Attenni: 3663452810",
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vcard], {
        type: "text/vcard;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "CA-ER-Studio-Creativo.vcf";
    link.click();

    URL.revokeObjectURL(url);
});

// APERTURA E CHIUSURA DEL BIGLIETTO

const digitalCard = document.querySelector("#digital-card");

digitalCard.addEventListener("click", (event) => {

    // Evita che i link e i pulsanti attivino la rotazione
    if (event.target.closest("a, button")) {
        return;
    }

    digitalCard.classList.toggle("ruota");

});

// DOWNLOAD FRONTE E RETRO DEL BIGLIETTO

async function scaricaBiglietto(lato, nomeFile) {

    const originale = document.querySelector(lato);

    if (!originale || typeof html2canvas === "undefined") {
        alert("Impossibile preparare l'immagine. Riprova.");
        return;
    }

    const contenitore = document.createElement("div");

    contenitore.style.position = "fixed";
    contenitore.style.left = "-10000px";
    contenitore.style.top = "0";
    contenitore.style.width = originale.offsetWidth + "px";
    contenitore.style.height = originale.offsetHeight + "px";
    contenitore.style.overflow = "hidden";

    const copia = originale.cloneNode(true);

    copia.style.position = "absolute";
    copia.style.inset = "0";
    copia.style.width = "100%";
    copia.style.height = "100%";
    copia.style.transform = "none";
    copia.style.backfaceVisibility = "visible";

    contenitore.appendChild(copia);
    document.body.appendChild(contenitore);

    try {
        const canvas = await html2canvas(contenitore, {
            scale: 3,
            backgroundColor: null,
            useCORS: true
        });

        const link = document.createElement("a");
        link.download = nomeFile;
        link.href = canvas.toDataURL("image/png");
        link.click();

    } catch (errore) {
        console.error(errore);
        alert("Si è verificato un errore durante il download.");
    } finally {
        contenitore.remove();
    }
}

document.getElementById("scarica-biglietto")
    ?.addEventListener("click", async () => {

        await scaricaBiglietto(
            ".digital-card-front",
            "CA-ER-biglietto-fronte.png"
        );

        await scaricaBiglietto(
            ".digital-card-back",
            "CA-ER-biglietto-retro.png"
        );

    });


/* ANIMAZIONE SEZIONI ALLO SCORRIMENTO */

const sezioniAnimate = document.querySelectorAll(".sezione-animata");

const osservatore = new IntersectionObserver((elementi) => {
    elementi.forEach((elemento) => {
        if (elemento.isIntersecting) {
            elemento.target.classList.add("visibile");
            osservatore.unobserve(elemento.target);
        }
    });
}, {
    threshold: 0.15
});

sezioniAnimate.forEach((sezione) => {
    osservatore.observe(sezione);
});
