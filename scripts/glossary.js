/*const glossary_terms = 
[
    { jp: "コード", en: "code" },
    { jp: }
];*/

const toggleLoad = () => {
    const loader = $('.loader');

    if (loader.length) {
        loader.remove();
    } else {
        $('.glossary-entries').add('div').addClass('loader');
    }
}

const addEntry = (entry) => {

}

const loadGlossary = (json) => {
    console.log("Loading glossary title: " + json.glossary.title);

    for (let i in json.glossary.entries) {
        addEntry(json.glossary.entries[i]);
    }

    //toggleLoad();

}

$(document).ready(function(){
    //toggleLoad();
    fetch("../data/glossary.json")
    .then(response => response.json())
    .then(json => loadGlossary(json));
});


