document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.stats__box');
    const panels = document.querySelectorAll('.tab__panel');
    const dynamicContent = document.getElementById('dynamic-content'); 

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            
            if (!dynamicContent.classList.contains('show')) {
                dynamicContent.classList.add('show');
                
                setTimeout(() => {
                    const arrowPosition = document.querySelector('.scroll__separator').getBoundingClientRect().top;
                    window.scrollBy({ top: arrowPosition - 100, behavior: 'smooth' });
                }, 100); 
            }

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    const scrollArrow = document.getElementById('scroll-to-content');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.querySelector('.full__widthline').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }




    const categoriesConfig = [
        {
            idHTML: "container-vitesse", 
            cleJson: "vitesse_kmh",  
            unite: "km/h",
            refNom: "Voiture",
            refValeur: 130,
            template: "vitesse"
        },
        {
            idHTML: "container-poids",
            cleJson: "poids_kg",
            unite: "kg",
            refNom: "Smartphone",
            refValeur: 0.16,
            template: "poids"
        },
        {
            idHTML: "container-traction",
            cleJson: "force_kg",
            unite: "kg",
            refNom: "PS5",
            refValeur: 4.5,
            template: "force"
        },
        {
            idHTML: "container-neurones",
            cleJson: "neurones_corticaux",
            unite: "",
            refNom: "",
            refValeur: 16300000000,
            template: "force"
        },
        {
            idHTML: "container-taille",
            cleJson: "taille_cm", 
            unite: "cm",
            refNom: "Humain",
            refValeur: 170,
            template: "taille"
        }
    ];


    fetch('data.json')
    .then(response => response.json())
    .then(animauxData => {
        
        categoriesConfig.forEach(categorie => {
            const container = document.getElementById(categorie.idHTML);
            if (!container) return;

            let valeurMax = categorie.refValeur;
            for (const nom in animauxData) {
                if (animauxData[nom][categorie.cleJson] > valeurMax) {
                    valeurMax = animauxData[nom][categorie.cleJson];
                }
            }

            for (const [nomAnimal, donneesAnimal] of Object.entries(animauxData)) {
                
                const valeurAnimal = donneesAnimal[categorie.cleJson];

                let rapport = valeurAnimal / categorie.refValeur;
                let texteComparaison = rapport >= 1 ? `x ${rapport.toFixed(2).toLocaleString('fr-FR')}` : `x ${rapport.toFixed(3)}`;

                const localMax = Math.max(valeurAnimal, categorie.refValeur);

                const scaleAnimal = Math.sqrt(valeurAnimal / localMax);
                const scaleRef = Math.sqrt(categorie.refValeur / localMax);

                const widthAnimal = (valeurAnimal / localMax) * 100;
                const widthRef = (categorie.refValeur / localMax) * 100;

                const heightAnimal = (valeurAnimal / localMax);
                const heightRef = (categorie.refValeur / localMax);

                let cardHTML = "";

                if (categorie.template === "vitesse") {
                    cardHTML = `
                        <div class="horizonpackcenter box">
                            <div class="columV names-column">
                                <h3>${nomAnimal}</h3>
                                <h3>${categorie.refNom}</h3>
                            </div>
                            <div class="separatevert"></div>
                            <div class="columV ajustgap">
                                <div class="elephantVA" style="width: ${widthAnimal}%;"></div>
                                <div class="elephantVO" style="width: ${widthRef}%;"></div>
                            </div>
                            <div class="separatevert"></div>
                            <div class="columV ajustgap2 spaceel">
                                <p>${valeurAnimal.toLocaleString('fr-FR')} ${categorie.unite}</p>
                                <p>${categorie.refValeur.toLocaleString('fr-FR')} ${categorie.unite}</p>
                            </div>
                        </div>`;
                } 
                else if (categorie.template === "poids") {
                    cardHTML = `
                        <div class="box">
                            <div class="upinfo">
                                <h3>${nomAnimal}</h3>
                                <span>${categorie.refNom} (${texteComparaison})</span>
                            </div>
                            <div class="graphbox">
                                <div class="horizonflex">
                                    <div class="ingraphcenter">
                                        <div class="circle animal" style="--computed-scale: ${scaleAnimal};"></div>
                                        <div class="separateur"></div>
                                        <span class="legende">${valeurAnimal.toLocaleString('fr-FR')} ${categorie.unite}</span>
                                    </div>
                                    <div class="ingraphcenter">
                                        <div class="circle device" style="--computed-scale: ${scaleRef};"></div>
                                        <div class="separateur"></div>
                                        <span>${categorie.refValeur.toLocaleString('fr-FR')} ${categorie.unite}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }
                else if (categorie.template === "force") {
                    cardHTML = `
                        <div class="box">
                            <div class="upinfo">
                                <h3>${nomAnimal}</h3>
                                <span class="spanstyle">${categorie.refNom} (${texteComparaison})</span>
                            </div>
                            <div class="graphbox">
                                <div class="horizonflex">
                                    <div class="ingraphcenter">
                                        <div style="transform: scale(${scaleAnimal}); transform-origin: bottom center;">
                                            <svg width="200" height="160" viewBox="0 0 550 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M111.714 89.7228C114.428 82.1848 121.579 77.1592 129.59 77.1592H413.14C421.008 77.1592 428.063 82.0094 430.88 89.3564L540.106 374.197C544.877 386.639 535.691 399.999 522.365 399.999H27.0349C13.8751 399.999 4.70028 386.945 9.15825 374.563L111.714 89.7228Z" fill="#D9D9D9"/>
                                                <ellipse cx="275" cy="48.284" rx="48.1959" ry="48.284" fill="#D9D9D9"/>
                                                <ellipse cx="275" cy="48.2838" rx="25.5155" ry="25.5621" fill="#1D1D1D"/>
                                            </svg>
                                        </div>
                                        <div class="separateur"></div>
                                        <span class="legende">${valeurAnimal.toLocaleString('fr-FR')} ${categorie.unite}</span>
                                    </div>
                                    <div class="ingraphcenter">
                                        <div style="transform: scale(${scaleRef}); transform-origin: bottom center;">
                                            <svg width="200" height="160" viewBox="0 0 550 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M111.714 89.7314C114.428 82.1935 121.578 77.168 129.59 77.168H413.14C421.008 77.168 428.063 82.0181 430.88 89.365L540.105 374.197C544.877 386.639 535.691 400 522.365 400H27.0351C13.8752 400 4.70045 386.945 9.15855 374.563L111.714 89.7314Z" fill="#F8304A"/>
                                                <ellipse cx="274.991" cy="48.2823" rx="48.1955" ry="48.2823" fill="#F8304A"/>
                                                <ellipse cx="275.001" cy="48.294" rx="25.5151" ry="25.5611" fill="#1D1D1D"/>
                                            </svg>
                                        </div>
                                        <div class="separateur"></div>
                                        <span class="legende">${categorie.refValeur.toLocaleString('fr-FR')} ${categorie.unite}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }

                else if (categorie.template === "taille") {
                    cardHTML = `
                        <div class="box">
                            <div class="upinfo">
                                <h3>${nomAnimal}</h3>
                                <span class="spanstyle">${categorie.refNom} (${texteComparaison})</span>
                            </div>
                            <div class="graphbox">
                                <div class="horizonflex">
                                    <div class="ingraphcenter">
                                        <div class="svg-wrapper" style="transform: scale(${heightAnimal}); transform-origin: bottom center;">
                                            <svg width="45" height="142" viewBox="0 0 45 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="45" height="340" fill="#D9D9D9"/>
                                            </svg>

                                        </div>
                                        <div class="separateur"></div>
                                        <span class="legende">${valeurAnimal.toLocaleString('fr-FR')} ${categorie.unite}</span>
                                    </div>
                                    <div class="ingraphcenter">
                                        <div class="svg-wrapper" style="transform: scale(${heightRef}); transform-origin: bottom center;">
                                            <svg width="50" height="142" viewBox="0 0 50 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.1667 136.354V92.0833H5.3125C3.80729 92.0833 2.54575 91.574 1.52823 90.5551C0.50929 89.5376 0 88.276 0 86.7708V47.2813C0 44.3594 1.04054 41.8579 3.12198 39.7765C5.202 37.6964 7.70312 36.6563 10.625 36.6563H38.9583C41.8802 36.6563 44.3817 37.6964 46.4631 39.7765C48.5431 41.8579 49.5833 44.3594 49.5833 47.2813V86.7708C49.5833 88.276 49.0744 89.5376 48.0569 90.5551C47.0379 91.574 45.776 92.0833 44.2708 92.0833H35.4167V136.354C35.4167 137.859 34.906 139.121 33.8849 140.138C32.8649 141.157 31.6005 141.667 30.0918 141.667H19.4402C17.9315 141.667 16.6752 141.157 15.6719 140.138C14.6685 139.121 14.1667 137.859 14.1667 136.354ZM24.8058 25.8542C21.2546 25.8542 18.2102 24.5898 15.6719 22.061C13.1336 19.5323 11.8646 16.4924 11.8646 12.9412C11.8646 9.39013 13.129 6.3455 15.6577 3.80729C18.1865 1.26908 21.2263 0 24.7775 0C28.3287 0 31.3731 1.26438 33.9115 3.79313C36.4498 6.32188 37.7188 9.36179 37.7188 12.9129C37.7188 16.464 36.4544 19.5087 33.9256 22.0469C31.3969 24.5852 28.3571 25.8542 24.8058 25.8542Z" fill="#0DC459"/>
                                            </svg>

                                        </div>
                                        <div class="separateur"></div>
                                        <span class="legende">${categorie.refValeur.toLocaleString('fr-FR')} ${categorie.unite}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }
                
                    
                    container.innerHTML += cardHTML;
                }
            });
        })
        .catch(error => console.error("Erreur de chargement des données JSON :", error));
});


const tabs = document.querySelectorAll(".tab");
const categories = document.querySelectorAll(".category");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.dataset.category;
        categories.forEach(cat => {
            cat.classList.toggle("active", cat.id === target);
        });
    });
});

const backToTop =document.querySelector(".backToTop");

if (backToTop){
    window.addEventListener("scroll", showBackToTop);
}

function showBackToTop(){
    const currentScroll = window.scrollY;
    console.log(currentScroll);
    if(currentScroll > 1200){
        backToTop.classList.add("backToTop--show");
    } else {
        backToTop.classList.remove("backToTop--show")
    }
}