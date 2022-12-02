// on-load get master json file
// feed to solution explorer

import SolutionExplorer from "./solutionExplorer.js";

var solutionExplorer = null;

const loadSolutionExplorer = (json) => {
    if (solutionExplorer) {
        return;
    }

    solutionExplorer = new SolutionExplorer(json);
}

$(function() {
    return;
    fetch('../data/solutionExplorer.json')
    .then(response => response.json())
    .then(json => loadSolutionExplorer(json)); 
});
