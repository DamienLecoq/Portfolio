const filterButtons = document.querySelectorAll(".filter_buttons .case button");
const filterableCards = document.querySelectorAll(".filterable_cards .card");
const exitButton = document.querySelectorAll(".exitRetex")
console.log(exitButton);
const filterCards = e => {
    document.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    filterableCards.forEach(card => {
        card.classList.add("hide");
    });

    if (e.target.dataset.name === "all"){
        filterableCards[0].classList.remove("hide");
        filterableCards[1].classList.remove("hide");
        filterableCards[2].classList.remove("hide");
        filterableCards[3].classList.remove("hide");
        filterableCards[4].classList.remove("hide");
    };

    if (e.target.dataset.name === "solo"){
        filterableCards[0].classList.remove("hide");
        filterableCards[1].classList.remove("hide");
        filterableCards[2].classList.remove("hide");
    };
    if (e.target.dataset.name === "team"){
        filterableCards[2].classList.remove("hide");
        filterableCards[3].classList.remove("hide");
        filterableCards[4].classList.remove("hide");
    };
    if (e.target.dataset.name === "java"){
        filterableCards[2].classList.remove("hide");
        filterableCards[3].classList.remove("hide");
    };
    if (e.target.dataset.name === "bash"){
        filterableCards[4].classList.remove("hide");
    };
    if (e.target.dataset.name === "verse"){
        filterableCards[0].classList.remove("hide");
    };
    if (e.target.dataset.name === "uefn"){
        filterableCards[0].classList.remove("hide");
    };
    if (e.target.dataset.name === "C"){
        filterableCards[0].classList.remove("hide");
    };
    if (e.target.dataset.name === "html"){
        filterableCards[1].classList.remove("hide");
    };
    if (e.target.dataset.name === "css"){
        filterableCards[1].classList.remove("hide");
    };
    if (e.target.dataset.name === "js"){
        filterableCards[1].classList.remove("hide");
    };
};
filterButtons.forEach(button => button.addEventListener("click", filterCards));

filterableCards[0].addEventListener("click", toggleUefn);
filterableCards[1].addEventListener("click", togglePixel);
filterableCards[2].addEventListener("click", toggleTowa);
filterableCards[3].addEventListener("click", toggleGraphes);
filterableCards[4].addEventListener("click", toggleRéseau);
filterableCards[5].addEventListener("click", toggleWeb);
exitButton.forEach(button => button.addEventListener("click", toggle));

function toggleUefn(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('retexActive');
    var popup = document.getElementById("RetexUE");
    popup.classList.toggle('activate');
}

function togglePixel(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('retexActive');
    var popup = document.getElementById("RetexPixel");
    popup.classList.toggle('activate');
}

function toggleTowa(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('retexActive');
    var popup = document.getElementById("RetexTowa");
    popup.classList.toggle('activate');
}

function toggleGraphes(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('retexActive');
    var popup = document.getElementById("RetexGraphes");
    popup.classList.toggle('activate');
}

function toggleRéseau(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('retexActive');
    var popup = document.getElementById("RetexRéseau");
    popup.classList.toggle('activate');
}

function toggleWeb(){
    var blur = document.getElementById("blur");
    blur.classList.toggle('retexActive');
    var popup = document.getElementById("RetexWeb");
    popup.classList.toggle('activate');
}

function toggle(){
    var blur = document.getElementById("blur");
    blur.classList.remove('retexActive');
    var popup = document.querySelectorAll(".popup");
    popup.forEach(pop => {
        pop.classList.remove('activate');
    })
}

window.onload = function() {
    setTimeout(function(){
        const specificElementStatus = localStorage.getItem('specificElement');
        if (specificElementStatus === 'uefn') {
            toggleUefn();
        }
        if (specificElementStatus === 'pixel') {
            togglePixel();
        }
        if (specificElementStatus === 'towa') {
            toggleTowa();
        }
        if (specificElementStatus === 'graphes') {
            toggleGraphes();
        }
        localStorage.removeItem('specificElement');
    },500)
};


let verses = document.querySelectorAll(".verse");
let uefns = document.querySelectorAll(".Uefn");
let Cs = document.querySelectorAll(".C");
let javas = document.querySelectorAll(".java");
let bashs = document.querySelectorAll(".bash");
let htmls = document.querySelectorAll(".html");
let csss = document.querySelectorAll(".css");
let jss = document.querySelectorAll(".js");
let seuls = document.querySelectorAll(".Seul");
let equipes = document.querySelectorAll(".Equipe");
let myTexts = document.querySelectorAll(".LanguageName");

verses.forEach((verse) => {
    verse.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "VERSE";
          });
    })
    verse.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

uefns.forEach((uefn) => {
    uefn.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "Unreal Engine";
          });
    })
    uefn.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

Cs.forEach((C) => {
    C.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "C++";
          });
    })
    C.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

javas.forEach((java) => {
    java.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "Java";
          });
    })
    java.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

bashs.forEach((bash) => {
    bash.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "Bash";
          });
    })
    bash.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

htmls.forEach((html) => {
    html.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "HTML";
          });
    })
    html.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

csss.forEach((css) => {
    css.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "CSS";
          });
    })
    css.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

jss.forEach((js) => {
    js.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "JavaScript";
          });
    })
    js.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

seuls.forEach((seul) => {
    seul.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "Individuel";
          });
    })
    seul.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});

equipes.forEach((equipe) => {
    equipe.addEventListener('mouseover',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "En equipe";
          });
    })
    equipe.addEventListener('mouseout',() =>{
        myTexts.forEach((myText) => {
            myText.textContent= "";
            });
    })
});