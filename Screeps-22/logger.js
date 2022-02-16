// imports
const html = require("html");

/**
 * trims a string to a specific size. Will add "..." if too long
 * didn't add to prototype (dangerous)
 */
const trimToSize = function (str, l) {
    if (!str) return " ".repeat(l);
    return str.length > l ?
        str.substring(0, l - 3) + "..." :
        str + " ".repeat(l - str.length);
}

/**
 * set default style values
 */
const setDefaultStyle = function () {
    // default properties
    const defaultLogSize = "16px";

    const defaultStl = {
        size: defaultLogSize
    }
    const defaultStyle = html.getStyle(defaultStl);
    console.log(`<style>*{${defaultStyle}}</style>`)
}

const getErrorInfo = function (error) {
    if (!error.stack) return { line: "", source: "" };

    // the line that is interesting for us
    const throwLine = error.stack.split("\n")[2];
    const length = throwLine.length;

    // source
    const sourceStartIndex = throwLine.indexOf("at ") + 3;
    const sourceStopIndex = throwLine.indexOf(" (");
    const source = throwLine.substring(sourceStartIndex, sourceStopIndex);

    // line
    const endLine = throwLine.substring(length - 8, length);
    const start = endLine.indexOf(":") + 1;
    const stop = start + endLine.substring(start, 12).indexOf(":");
    const line = endLine.substring(start, stop);


    log(line);
    log(source);

    return { line, source };
}

/**
 * backup to latest errors for further debugging
 */
const backup = function () {
    if (global.errors)
        for (let [category, content] of Object.entries(global.errors))
            _.set(global.latestErrors, category, content);

    if (global.warnings)
        for (let [category, content] of Object.entries(global.warnings))
            _.set(global.latestWarnings, category, content);
}

/**
 * hard flush. nothing left to debug
 */
const hardFlush = function () {
    flush();
    global.latestErrors = {}
    global.latestWarnings = {}
}

/**
 * flushes the log
 */
const flush = function () {
    backup();

    //
    global.errors = {
        // room: [] spawn errors
        // role: [] creep errors
        // other: []
    };
    global.warnings = {
        // testing: [] testing error (max 1, but oh well)
        // other: []
    };
    global.logs = []; // no categories, this is for pure debugging
}

/**
 * makes a details box of the warning, and adds it to the list
 * @param {String} summary 
 * @param {Error} error but it's really a warning
 */
const warning = function (summary = "Warning", error = {}, category = "other") {
    // #f37d00

    // not really an error
    if (!error.stack) {
        if (!_.get(global, `warnings.${category}`))
            _.set(global, `warnings.${category}`, []);

        global.warnings[category].push(summary);
    }

    // look for error info
    const info = getErrorInfo(error);
    const line = trimToSize(info.line, 4);
    const message = trimToSize(error.message, 40);
    const trimSum = trimToSize(summary, 15);

    // make summary
    const sum = `${trimSum} | ${message} | line: ${line} | src: ${info.source}`;

    // make detail box
    const text = html.getDetails(sum, error.stack);

    if (!_.get(global, `warnings.${category}`))
        _.set(global, `warnings.${category}`, []);

    global.warnings[category].push(text);
};

/**
 * makes a details box of the error, and adds it to the list
 * @param {String} summary 
 * @param {Error} error 
 */
const error = function (summary = "Error", error, category = "other") {
    // #ff9999
    // look for error info
    // const info = getErrorInfo(error);
    // const line = trimToSize(info.line, 4);
    // const message = trimToSize(error.message, 40);
    // const trimSum = trimToSize(summary, 15);

    // // make summary
    // const sum = `${trimSum} | ${message} | line: ${line} | src: ${info.error}`;

    // make detail box
    const text = html.getDetails(`${trimToSize(summary, 15)} | ${trimToSize(error.message, 40)} | info: `, error.stack, { color: "#ff9999" });

    if (!_.get(global, `errors.${category}`))
        _.set(global, `errors.${category}`, []);

    global.errors[category].push(text)
};

/**
 * adds to the log list, with formatting
 * @param {String} content 
 * @param {Object} stl style: {color, size}
 */
const log = function (content, stl = {}) {
    if (content === undefined) global.logs.push("<br>");
    else {
        const text = html.format(content, stl);
        global.logs.push(text);
    }
};

/**
 * unpacks a list of detail boxes, on per line
 * @param {Array} list list of details
 * @param {Object} stl style
 * @returns string
 */
const unpackList = function (list, stl = undefined) {
    if (stl == undefined) {
        stl = {
            position: "relative",
            left: "10px"
        }
    }

    let concat = ``;
    for (let text of list) {
        concat += text;
    }

    concat = html.format(concat, stl);

    return concat
}

/**
 * unpacks exception categories
 * accesses global[exceptionType] directly
 * @param {String} type warning or error
 * @returns string (makes detail boxes per category)
 */
const unpackCategories = function (type, stl = undefined) {
    if (stl === undefined) {
        const margin = "5px";
        stl = {
            position: "absolute",
            top: margin,
            left: margin,
            width: `calc(100% - 2 * ${margin})`,
            height: `calc(100% - 2 * ${margin})`,
            overflow: `auto`
        }
    }

    const color = (["warnings", "latestWarnings"].includes(type) ? "#f37d00" : "#ff9999");

    // either warnings or errors
    let exceptions = ``;

    // for each category we make a box too
    for (let category in global[type]) {
        let categoryExceptions = unpackList(global[type][category]);
        const number = global[type][category].length;
        categoryExceptions = html.getDetails(`${category} (${number})`, categoryExceptions, { color }, number <= 2);

        exceptions += categoryExceptions;
    }

    // put it on top left of the cell
    exceptions = html.format(exceptions, stl);

    return exceptions;
};

/**
 * display a fancy table with all logs
 */
const display = function () {
    // all non debugging logs
    // HEY NOW WE GOT TO MAKE IT RAIN SOMEHOW
    const warnings = unpackCategories("warnings");
    const errors = unpackCategories("errors");
    const logs = unpackList(global.logs, {
        position: "absolute",
        top: "5px",
        left: "5px",
        width: `calc(100% - 10px)`,
        height: `calc(100% - 10px)`,
        overflow: `auto`,
    });

    // cell types
    const tinyCell = { height: "100px", width: "48vw", position: "relative" };
    const highCell = { height: "200px", width: "48vw", position: "relative" };

    // table content
    let table = [
        [warnings, logs],
        [errors, undefined]
    ];

    let sizes = [
        [{}, { rowspan: 2 }],
        [{}, undefined]
    ];

    let styles = [
        [tinyCell, highCell],
        [tinyCell, undefined]
    ];

    // if debugging
    if (Memory.debugging) {
        let oldWarnings = unpackCategories("latestWarnings");
        let oldErrors = unpackCategories("latestErrors");

        table.push([oldWarnings, oldErrors]);
        sizes.push([undefined, undefined]);
        styles.push([highCell, highCell]);
    }

    console.log(html.getTable(table, styles, sizes));
};

// defaults
// setDefaultStyle();

// first flush when reset
flush();

module.exports = { warning, error, log, backup, hardFlush, flush, display }