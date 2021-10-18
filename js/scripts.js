import { langsByISO, langsByName, books } from "./langs.js";

// Some stuff about the DarkMode
if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    document.querySelector('link[href="/light.css"]').media = 'all';
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("choiceBar").style.top = "0";
    } else {
        document.getElementById("choiceBar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
}

// Separate the books object into two iterable arrays
const bookKeys = Object.keys(books);
const bookValues = Object.values(books);

// Populate the books of the BOM
for (let i = 0; i < bookKeys.length; i++) {
    const bookElement = document.querySelector("#books");
    const bookHTML = `<option value="${bookValues[i]}">${bookKeys[i]}</option>`;
    bookElement.innerHTML += bookHTML;
}

// Populate the chapters
for (let i = 1; i <= 63; i++) {
    // Improvement: Display chapters corrsponding to each book
    const chapterElement = document.querySelector("#chapters");
    const chapterHTML = `<option value="${i}">${i}</option>`;
    chapterElement.innerHTML += chapterHTML;
}

// Popultes both language dropdown menus at the same time
for (let i = 0; i < langsByISO.length; i++) {
    // Ideally, the second menu should filter out the firlst language, but whatever...
    const langOneElement = document.querySelector("#lang1");
    const langTwoElement = document.querySelector("#lang2");
    const langOptionHTML = `<option value="${langsByISO[i]}">${langsByName[i]}</option>`;
    langOneElement.innerHTML += langOptionHTML;
    langTwoElement.innerHTML += langOptionHTML;
}

// With defautl values instead of null because it's too much work
var selectedBook = bookValues[0];
var selectedChapter = 1;
var selectedLanguage1 = langsByISO[25]; // eng
var selectedLanguage2 = langsByISO[18]; // deu

function resetLanguageHTML(lang1, lang2) {
    const langDiv = document.querySelector("#langOutput");
    langDiv.innerHTML = ""

    const lang1SectionHTML = `<div id="left"><section id="${lang1}"></section></div>`;
    langDiv.innerHTML += lang1SectionHTML;

    const lang2SectionHTML = `<div id="right"><section id="${lang2}"></section></div>`;
    langDiv.innerHTML += lang2SectionHTML;
}

var selBooks = document.querySelector("#books");
selBooks.addEventListener("change", function () {
    let bookOptionValue = selBooks.value;
    selectedBook = bookOptionValue;
    // console.log(selectedBook);
});

var selChap = document.querySelector("#chapters");
selChap.addEventListener("change", function () {
    let chapterOptionValue = selChap.value;
    selectedChapter = chapterOptionValue;
    // console.log(selectedChapter);
});

var selLang1 = document.querySelector("#lang1");
selLang1.addEventListener("change", function () {
    let langOptionValue = selLang1.value;
    selectedLanguage1 = langOptionValue;
    console.log(selectedLanguage1);
});

var selLang2 = document.querySelector("#lang2");
selLang2.addEventListener("change", function () {
    let langOptionValue = selLang2.value;
    selectedLanguage2 = langOptionValue;
    console.log(selectedLanguage2);
});

document.querySelector("#search").addEventListener("click", function () {
    function fetchDataIn(book = "Nach", chapter, lang) {

        // Delete the intro after the first search
        document.querySelector("#instrustions").innerHTML = ""

        const urlBOM = `https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=${lang}&uri=/scriptures/bofm/${book}/${chapter}`
        let results = null;

        // Should reset the languages in the HTML, otherwise the chosen order can't be achieved
        resetLanguageHTML(selectedLanguage1, selectedLanguage2);

        function convertToJson(response) {
            if (response.ok) {
                return response.json();
            } else {
                console.log("error:", response);
            }
        }

        function displayScripts(data) {
            // console.log(data);
            const outputBOMElement = document.querySelector(`#${lang}`);
            console.log(outputBOMElement);
            results = data
            const chapterBody = results.content.body;
            outputBOMElement.innerHTML = chapterBody;
        }

        fetch(urlBOM).then(convertToJson).then(displayScripts);
    }

    fetchDataIn(selectedBook, selectedChapter, selectedLanguage1)
    fetchDataIn(selectedBook, selectedChapter, selectedLanguage2)
});

resetLanguageHTML(selectedLanguage1, selectedLanguage2);

