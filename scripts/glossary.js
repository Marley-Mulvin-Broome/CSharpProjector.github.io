var glossaryTerms = null;
var curTable = null;

const toggleLoad = () => {
    const loader = $('.loader');

    if (loader.length) {
        loader.remove();
    } else {
        $('.glossary-entries').append('<div class="loader"></div>');
    }
}

const createTable = () => {
    if (curTable !== null) {
        return curTable;
    }

    let table = $('<table>');
    let thead = $('<thead>');
    let tbody = $('<tbody>');
    let headRow = $('<tr>');
    let headOne = $('<td>').text('日本語');
    let headTwo = $('<td>').text('英語');

    headRow.append(headOne);
    headRow.append(headTwo);

    thead.append(headRow);
    table.append(thead);
    table.append(tbody);

    $('.glossary-entries').append(table);

    return table;
}

const addEntry = (tbody, entry) => {
    console.log("Add entry: " + entry);

    let row = $('<tr>');
    let jp = $('<td>').text(entry.jp);
    let en = $('<td>').text(entry.en);
    
    row.append(jp, en);

    tbody.append(row);
}

const loadGlossary = (json) => {
    if (json != null) {
        glossaryTerms = json.glossary.entries;
    }

    curTable = createTable();

    let tbody = curTable.find('tbody');

    for (let i in glossaryTerms) {
        addEntry(tbody, glossaryTerms[i]);
    }

    toggleLoad();

}

const entryMatchesSearch = (entry, term) => {
    for (let i in entry) {
        if (entry[i].includes(term)) {
            return true;
        }
    }

    return false;
}

const search = (table, glossTerms, searchTerm) => {
    if (table === null) {
        return;
    }

    let newBody = $('<tbody>');

    for (let i in glossTerms) {
        if (!(entryMatchesSearch(glossTerms[i].jp, searchTerm) || entryMatchesSearch(glossTerms[i].en, searchTerm)) && searchTerm != '') {
            continue;
        }

        addEntry(newBody, glossTerms[i]);
    }

    table.find('tbody').remove();
    table.append(newBody);
}

$(document).ready(function(){
    toggleLoad();
    fetch("../data/glossary.json")
    .then(response => response.json())
    .then(json => loadGlossary(json));

    const searchEvent = () => {
        search(curTable, glossaryTerms, $('#searchBar').val());
    }

    $('#searchButton').on('click', searchEvent);

    $('#searchBar').on('keydown', (e) => {
        if (e.key === 'Enter') {
            searchEvent();
        }
    });
});


