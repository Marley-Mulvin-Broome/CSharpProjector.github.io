/*const glossary_terms = 
[
    { jp: "コード", en: "code" },
    { jp: }
];*/

fetch("../test.json")
  .then(response => response.json())
  .then(json => console.log(json));