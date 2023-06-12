const slider = (minWidth) => {
    // Récupérer les éléments du DOM
    const slidesContainer = document.querySelectorAll(".slides");
    const slides = Array.from(document.querySelectorAll(".slide"));

    for (let i = 0; i < slidesContainer.length; i++) {
        slidesContainer[i].classList.add(`slides-${i}`);

        const prevButton = document.querySelectorAll(".prev-btn");
        const nextButton = document.querySelectorAll(".next-btn");
        let largeurEcran = slidesContainer[i].offsetWidth;

        // Définir l'index du slide actif
        let currentIndex = 0;
        let numberOfSlidesOnScreen = Math.floor(largeurEcran / minWidth);
        let newSlideWidth =
            (largeurEcran - numberOfSlidesOnScreen) /
            Math.floor(largeurEcran / minWidth);

        const slideWidthUp = () => {
            slides.forEach((slide) => {
                slide.style.minWidth = `${newSlideWidth}px`;
            });
        };
        slideWidthUp();
        window.addEventListener("resize", function () {
            largeurEcran = slidesContainer[i].offsetWidth;

            numberOfSlidesOnScreen = Math.floor(largeurEcran / minWidth);
            if (largeurEcran % minWidth !== 0) {
                newSlideWidth = largeurEcran / numberOfSlidesOnScreen;

                slidesContainer[i].style.transform = `translateX(-${
                    newSlideWidth * currentIndex
                }px)`;

                slideWidthUp();
            }
        });
        // Fonction pour déplacer les slides
        function goToSlide(index) {
            slidesContainer[i].style.transform = `translateX(-${
                newSlideWidth * index
            }px)`;
        }

        // Fonction pour afficher le slide suivant
        function nextSlide() {
            currentIndex++;
            if (
                currentIndex + numberOfSlidesOnScreen - 1 ===
                slides.length / slidesContainer.length
            ) {
                currentIndex = 0;
            }
            goToSlide(currentIndex);
        }

        // Fonction pour afficher le slide précédent
        function prevSlide() {
            currentIndex--;
            console.log(currentIndex);
            if (currentIndex < 0) {
                currentIndex =
                    slides.length / slidesContainer.length -
                    numberOfSlidesOnScreen;
            }
            goToSlide(currentIndex);
        }

        nextButton[i].addEventListener("click", nextSlide);
        prevButton[i].addEventListener("click", prevSlide);

        let touchstartX = 0;
        let touchendX = 0;
        const gestureZone = document.getElementsByClassName("slides")[i];

        gestureZone.addEventListener("touchstart", function (event) {
            touchstartX = event.changedTouches[0].screenX;
        });

        gestureZone.addEventListener("touchend", function (event) {
            touchendX = event.changedTouches[0].screenX;
            handleGesture();
        });

        function handleGesture() {
            if (touchendX < touchstartX) {
                console.log("Swiped left");
                nextSlide();
            }

            if (touchendX > touchstartX) {
                console.log("Swiped right");
                prevSlide();
            }

            if (touchendX === touchstartX) {
                console.log("Tap");
            }
        }
    }
};

slider(300);
