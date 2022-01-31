import { langsByISO, langsByName, booksAndChapters } from "./langs.js";

// Some stuff about the DarkMode
if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
    document.querySelector('link[href="/light.css"]').media = 'all';
}

// // Related to the autohide of the choiceBar
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//         document.getElementById("choiceBar").style.top = "0";
//     } else {
//         document.getElementById("choiceBar").style.top = "-100px";
//     }
//     prevScrollpos = currentScrollPos;
// }

// Separate books object into 3 arrays
let bookNames = []
for (let i = 0; i < 15; i++) { bookNames.push(booksAndChapters.books[i].bookName) };
let bookCodes = []
for (let i = 0; i < 15; i++) { bookCodes.push(booksAndChapters.books[i].bookCode) };
let bookChapters = []
for (let i = 0; i < 15; i++) { bookChapters.push(booksAndChapters.books[i].bookChapters) };

// With defautl values instead of null because it's too much work
var selectedBook = bookCodes[0];
var selectedChapter = 1;
var selectedLanguage1 = langsByISO[18]; // deu
var selectedLanguage2 = langsByISO[25]; // eng

// console.log(langsByISO.indexOf("ara"));

// Populate the books of the BOM
for (let i = 0; i < 15; i++) {
    const bookElement = document.querySelector("#books");
    const bookHTML = `<option value="${bookCodes[i]}">${bookNames[i]}</option>`;
    bookElement.innerHTML += bookHTML;
}

// Populate the chapters
function populateChapters(len = 22) {
    const chapterElement = document.querySelector("#chapters");
    chapterElement.innerHTML = ""

    for (let i = 1; i <= len; i++) {
        // Improvement: Display chapters corrsponding to each book
        const chapterHTML = `<option value="${i}">${i}</option>`;
        chapterElement.innerHTML += chapterHTML;
    }
    selectedChapter = 1
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

// Fix language direction style issue: Make an array of rtl languages and return a bool. Use the result to create a conditional rule in CSS.

function resetLanguageHTML(lang1, lang2) {
    const langDiv = document.querySelector(".langOutput");
    langDiv.innerHTML = ""

    const lang1SectionHTML = `<div class="left"><section id="${lang1}"></section></div>`;
    langDiv.innerHTML += lang1SectionHTML;
    const lang2SectionHTML = `<div class="right"><section id="${lang2}"></section></div>`;
    langDiv.innerHTML += lang2SectionHTML;
}

var selBooks = document.querySelector("#books");
selBooks.addEventListener("change", function() {
    let bookOptionValue = selBooks.value;
    selectedBook = bookOptionValue;

    localStorage.setItem("selectedBook", selectedBook);


    // console.log(selectedBook);

    // Finds the number of chapters to populate the chapter menu
    let numChap = booksAndChapters.books.find(obj => obj.bookCode == selectedBook);
    // console.log(numChap.bookChapters);
    populateChapters(numChap.bookChapters);
});

var selChap = document.querySelector("#chapters");
selChap.addEventListener("change", function() {
    let chapterOptionValue = selChap.value;
    selectedChapter = chapterOptionValue;
    // console.log(selectedChapter);
});

var selLang1 = document.querySelector("#lang1");
selLang1.addEventListener("change", function() {
    let langOptionValue = selLang1.value;
    selectedLanguage1 = langOptionValue;
    console.log(selectedLanguage1);
});

var selLang2 = document.querySelector("#lang2");
selLang2.addEventListener("change", function() {
    let langOptionValue = selLang2.value;
    selectedLanguage2 = langOptionValue;
    console.log(selectedLanguage2);
});

document.querySelector("#search").addEventListener("click", function() {

    // Delete the intro after the first search
    document.querySelector(".instructions").innerHTML = ""

    function urlBOM(book, chapter, lang) {
        // First search if the chosen language is stored locally
        const localLanguages = ["eng", "spa", "por", "rus", "deu", "ukr"]
        if (localLanguages.includes(lang)) {
            console.log(`${lang} found locally`);
            return `bomLocal/${lang}/${book}_${chapter}.json`;
        } else {
            return `https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=${lang}&uri=/scriptures/bofm/${book}/${chapter}`;
        }

        // Original URL
        // https://www.churchofjesuschrist.org/study/api/v3/language-pages/type/content?lang=eng&uri=/scriptures/bofm/1-ne/1
    }

    // Should reset the languages in the HTML, otherwise the chosen order can't be achieved
    //resetLanguageHTML(selectedLanguage1, selectedLanguage2);

    function convertToJson(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log("error:", response);
        }
    }

    // THE VERS ALIGNMENT IS CREDITED TO ROUVEN LEMMERZ
    function alignSideBySide(chapterBody0, chapterBody1) {
        let dat0 = new DOMParser().parseFromString(chapterBody0, 'text/html');
        let dat1 = new DOMParser().parseFromString(chapterBody1, 'text/html');

        function wraptr(str) {
            //table row functionality (css can also emulate p tag as tr)
            //return "<tr class=\'tablerow\'>"+str+"<\/tc>";
            return str;
        }

        function wraptc(str, tag) {
            //table cell functionality
            return "<span class=\'" + tag + "\'>" + str + "<\/span>";
            //return str;
        }

        let headerH1Nodes0 = dat0.querySelectorAll("header > h1");
        let headerH1Nodes1 = dat1.querySelectorAll("header > h1");
        for (let i = 0; i < headerH1Nodes0.length; i++) {
            headerH1Nodes0[i].innerHTML = wraptc(headerH1Nodes0[i].innerHTML, "left") + wraptc(headerH1Nodes1[i].innerHTML, "right");
        }


        //Merge Headers
        // (Chapter headings not yet Merged)
        let headerPNodes0 = dat0.querySelectorAll("header > p");
        let headerPNodes1 = dat1.querySelectorAll("header > p");
        for (let i = 0; i < headerPNodes0.length; i++) {
            headerPNodes0[i].innerHTML = wraptc(headerPNodes0[i].innerHTML, "left") + wraptc(headerPNodes1[i].innerHTML, "right");
        }

        //Merge Paragraphs by number
        for (let i = 1; i < dat0.getElementsByClassName("verse").length + 1; i++) {
            dat0.getElementById("p" + i).innerHTML = wraptr(wraptc(dat0.getElementById("p" + i).innerHTML, "left") + wraptc(dat1.getElementById("p" + i).innerHTML, "right"));
        }

        //Merge Footers (if existent)
        let footer0 = dat0.querySelector("footer");
        let footer1 = dat1.querySelector("footer");

        if (footer0 != null && footer1 != null) {
            let f0 = "";
            let f1 = "";
            if (footer0 != null) {
                f0 = footer0.innerHTML;
            }

            if (footer1 != null) {
                f1 = footer1.innerHTML;
            }

            footer0.innerHTML = wraptr(wraptc(f0, "left") + wraptc(f1, "right"));
        }
        return dat0.body.innerHTML;
    }

    async function displayScripts() {
        const outputBOMElement = document.querySelector(".langOutput");
        let data0 = await fetch(urlBOM(selectedBook, selectedChapter, selectedLanguage1)).then(convertToJson);
        let data1 = await fetch(urlBOM(selectedBook, selectedChapter, selectedLanguage2)).then(convertToJson);
        let chapterBody0 = data0.content.body;
        let chapterBody1 = data1.content.body;
        // Somewhere over here replace("/study/","https://www.churchofjesuschrist.org/study/") so the footnotes actually work
        outputBOMElement.innerHTML = alignSideBySide(chapterBody0, chapterBody1);
    }

    displayScripts();


});

// resetLanguageHTML(selectedLanguage1, selectedLanguage2);
populateChapters()