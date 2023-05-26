const fs = require('fs');
const formatter = require('html-formatter');
// const cssbeautify = require('cssbeautify');
const beautify = require('beautify');

const rootPath = './build';
const scriptsFile = `${rootPath}/js/main.js`;
const stylesFile = `${rootPath}/css/main.css`;

const workFiles = [{
    name: 'styles',
    path: stylesFile,
    prefix: '<style>\n',
    postfix: '\n</style>',
}, {
    name: 'scripts',
    path: scriptsFile,
    prefix: '\n\n<script>\n//<![CDATA[\n',
    postfix: '\n//]]>\n</script>\n\n',
}, {
    name: 'html',
    path: `${rootPath}/index.html`,
}];

const resultFile = './build/result.html';
const indent = '    ';

const replaceSymbols = string => string
    .replace(/&(?!nbsp|amp|shy|#|lt|gt)/g, '&amp;')
    .replace(/\u00A0/g, '&#160;')
    .replace(/(allowfullscreen>)n/g, 'allowfullscreen="allowfullscreen">')
    .replace(/(allowfullscreen\s)n/g, 'allowfullscreen="allowfullscreen" ')
    .replace(/\bwebkitallowfullscreen=""/g, 'webkitallowfullscreen="webkitallowfullscreen"')
    .replace(/\bmozallowfullscreen=""/g, 'mozallowfullscreen="mozallowfullscreen"')
    .replace(/n><\/iframe>/g, 'n><!-- --></iframe>')
    .replace(/"><\/iframe>/g, '"><!-- --></iframe>')
    .replace(/\s><\/iframe>/g, ' ><!-- --></iframe>');

fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
        console.log('\x1b[41m%s\x1b[0m', 'Failed to read config');
        return false;
    }
    let config = JSON.parse(data);
    paramsType = config.type;
    paramsTags = config.tags;
});

const readFiles = (items) => {
    if (items.length === 0) {
        console.log('\x1b[36m%s\x1b[0m', 'Congratulations! Complete save result file!');
        return;
    }

    const currentFile = items[0];

    fs.readFile(currentFile.path, (err, data) => {
        if (err) {
            console.log('\x1b[41m%s\x1b[0m', err.message);
            return false;
        }

        const prefix = (currentFile.prefix) ? currentFile.prefix : '';
        const postfix = (currentFile.postfix) ? currentFile.postfix : '';
        let dataFile = prefix + data + postfix;

        if (currentFile.name === 'styles') {
            dataFile = beautify(dataFile, {
                format: 'css',
            });

            dataFile = dataFile.replace(/\n\n.*(sourceMappingURL).*/g, '');
        }

        if (currentFile.name === 'html') {
            dataFile = formatter.closing(dataFile.split(/\<body?(.+?)\>/g)[2].split('</body>')[0]);
            
            dataFile = replaceSymbols(dataFile);
        }

        return fs.appendFile(resultFile, dataFile, (error) => {
            if (err) {
                console.log('\x1b[41m%s\x1b[0m', error.message);
                return false;
            }
            items.shift();
            return readFiles(items);
        });
    });
};

// очищение результирующего файла и старт записи в него
fs.writeFile(resultFile, '', 'utf8', (err) => {
    if (err) {
        console.log('\x1b[41m%s\x1b[0m', `${err.message} Need run task - "npm run build"`);
        return false;
    }
    console.log('\x1b[36m%s\x1b[0m', 'Result file is clean!');
    return readFiles(workFiles);
});