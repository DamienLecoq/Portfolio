let next = document.querySelector(".next")
let prev = document.querySelector(".prev")

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
})
prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
})

let verses = document.querySelectorAll(".Verse");
let uefns = document.querySelectorAll(".Uefn");
let Cs = document.querySelectorAll(".C");
let javas = document.querySelectorAll(".Java");
let bashs = document.querySelectorAll(".Bash");
let htmls = document.querySelectorAll(".Html");
let csss = document.querySelectorAll(".Css");
let jss = document.querySelectorAll(".Js");
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

const boutonUe = document.getElementById("boutonUe");
const boutonPixel = document.getElementById("boutonPixel");
const boutonTowa = document.getElementById("boutonTowa");
const boutonGraphes = document.getElementById("boutonGraphes");

boutonUe.addEventListener("click", function(){
    localStorage.setItem('specificElement', 'uefn');

})
boutonPixel.addEventListener("click", function(){
    localStorage.setItem('specificElement', 'pixel');
})
boutonTowa.addEventListener("click", function(){
    localStorage.setItem('specificElement', 'towa');
})
boutonGraphes.addEventListener("click", function(){
    localStorage.setItem('specificElement', 'graphes');
})