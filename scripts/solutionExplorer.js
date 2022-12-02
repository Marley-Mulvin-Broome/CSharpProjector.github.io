/*
FOLDER:
<li class="solution-explorer-item category not-selectable">
     <h3>Python入門編</h3>
 </li>

FILE:
<li class="solution-explorer-item solution">
    <h3>#1 Print文</h3>
    <input type="button" value="たたむ">
    <ul class="solution-container">
        <li class="solution-list">
            <h4>テーブルみたいな出力</h4>
            <div class="code-container">
                <pre>
                    <code class="solution-code language-python">
                    </code>
                </pre>
            </div>
        </li>
    </ul>
</li>

*/

function pathJoin(parts, sep){
    const separator = sep || '/';
    parts = parts.map((part, index)=>{
        if (index) {
            part = part.replace(new RegExp('^' + separator), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(separator + '$'), '');
        }
        return part;
    })
    return parts.join(separator);
}

class Folder {
    path;
    name;
    folders = [];
    files = [];

    constructor(path, name) {
        this.path = path;
        this.name = name;
    }

    addFolder(folder) {
        this.folder.push(folder);
    }

    addFile(file) {
        this.files.push(folder);
    }

    get contents() {
        return this.folders.concat(files);
    }
}

class File {
    path;
    name;
    solutions = [];

    constructor(path, name) {
        this.path = path;
        this.name = name;
    }
}

class SolutionExplorer {
    #explorerElement
    #directoryLabel
    #solutionList
    #rootDir
    #rootFolders = []
    #currentDir

    constructor(json) {
        this.#explorerElement = $('.solution-explorer').append('<ul>');
        this.#directoryLabel = $('#solutionExplorerDirectory');
        this.#solutionList = this.#explorerElement.find('ul');
        this.#solutionList.addClass('solution-explorer-list');

        this.load(json);
        this.setPath('');
    }

    load(json) {
        let explorer = json.explorer;
        this.#rootDir = explorer.rootDir;

        let rootJson = explorer.root;

        for (let i in rootJson) {
            this.#rootFolder.append(this.createFolder(this.#rootDir, rootJson[i]));
        }
    }

    createFolder(relativePath, element) {
        let topFolder = new Folder(pathJoin([relativePath, element.path]), element.name);

        for (let i in topFolder.contents) {
            if (topFolder.contents[i].type == 'file') {
                topFolder.addFile(createFile(topFolder.contents[i], topFolder.path))
            } else if (topFolder.contents[i].type == 'folder') {
                topFolder.addFolder(this.createFolder(topFolder.path, topFolder.contents[i]));
            }
        }

        return topFolder;
    }

    createFile(element, relativePath) {
        let newPath = pathJoin([relativePath, element.path]);

        let file = new File(newPath, element.name);

        fetch(file.path)
        .then(response => response.json())
        .then(json => file.solutions.append(json.solutions));

        return file;
    }

    matchItem(itemName, contents) {
        for (let i in contents) {
            if (contents.path === itemName) {
                return contents[i];
            }
        }
    }

    navigateToPath(path) {
        if (path === '') {
            return this.#rootFolders;
        }

        let curItem = null;

        let splitPath = path.split('/');

        for (let i in splitPath) {
            if (curItem === null) {
                curItem = this.matchItem(splitPath[i], this.#rootFolders);
            } else if (curItem instanceof File) {
                console.error('Navigating to path with path after file name. (' + path + ')');
            } else if (curItem instanceof Folder) {
                curItem = this.matchItem(splitPath[i], curItem.contents);
            }

            if (curItem == null) {
                console.warn('Path navigated to not found (' + path + ')');
                return null;
            }
        }

        return curItem;
    }

    setDirectoryLabel(path) {
        this.#directoryLabel.text(path);
    }

    setPath(path) {
        let item = this.navigateToPath(path);

        if (item === null) {
            return;
        }

        this.clear();

        this.#currentDir = path;

        this.setDirectoryLabel(this.#currentDir);

        // if its list
        // if its Folder
        // if its file

        let folderContents = item;

        if (folderContents instanceof Folder) {
            folderContents = folderContents.contents;
        }
    }

    forwardPath(path) {
        this.setPath(pathJoin([this.#currentDir, path]));
    }

    backPath() {

    }

    clear() {
        this.#solutionList.empty();
    }
}

export default SolutionExplorer;