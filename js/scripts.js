import { langsByISO, langsByName } from "./langs.js";

var books = {
    "1 Nephi": "1-ne",
    "2 Nephi": "2-ne",
    "Jacob": "jacob",
    "Enos": "enos",
    "Jarom": "jarom",
    "Omni": "omni",
    "Words of Mormon": "w-of-m",
    "Mosiah": "mosiah",
    "Alma": "alma",
    "Helaman": "hel",
    "3 Nephi": "3-ne",
    "4 Nephi": "4-ne",
    "Mormon": "morm",
    "Ether": "ether",
    "Moroni": "moro"
}

console.log(langsByName);

console.log(langsByISO.indexOf("deu"));

const bookKeys = Object.keys(books);
const bookValues = Object.values(books);

for (let i = 0; i < bookKeys.length; i++) {
    const bookElement = document.querySelector("#books");
    const bookHTML = `<option value="${bookValues[i]}">${bookKeys[i]}</option>`;
    bookElement.innerHTML += bookHTML;
}

for (let i = 1; i <= 63; i++) {
    // Improvement: Display chapters corrsponding to each book
    const chapterElement = document.querySelector("#chapters");
    const chapterHTML = `<option value="${i}">${i}</option>`;
    chapterElement.innerHTML += chapterHTML;
}

for (let i = 0; i < langsByISO.length; i++) {
    // Popultes both language dropdown menus at the same time. Ideally, the second menu should filter out the firlst language, but whatever...
    const langOneElement = document.querySelector("#lang1");
    const langTwoElement = document.querySelector("#lang2");
    const langOptionHTML = `<option value="${langsByISO[i]}">${langsByISO[i].toUpperCase()}</option>`;
    langOneElement.innerHTML += langOptionHTML;
    langTwoElement.innerHTML += langOptionHTML;
}

// With defautl values instead of null because it's too much work
var selectedBook = bookValues[0];
var selectedChapter = 1;
var selectedLanguage1 = langsByISO[24]; // eng
var selectedLanguage2 = langsByISO[17]; // deu

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
    console.log(selectedBook);
});

var selChap = document.querySelector("#chapters");
selChap.addEventListener("change", function () {
    let chapterOptionValue = selChap.value;
    selectedChapter = chapterOptionValue;
    console.log(selectedChapter);
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
            console.log(data);
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
