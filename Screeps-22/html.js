const baseTableStyle = "font-size:16px;color:white;width:auto;height:auto;border:1px solit white;padding:5px;border-collapse:collapse;";

/**
 * css styling
 * size, color, width, height, maxWidth, maxHeight, border, padding, collapse, tableLayout, display
 * @param {Object} stl 
 * @returns string - css
 */
const getStyle = function (stl = {}) {
    let style = ``;
    if (stl.size) style += `font-size:${stl.size};`;
    if (stl.color) style += `color:${stl.color};`;
    if (stl.width) style += `width:${stl.width};`
    if (stl.height) style += `height:${stl.height};`;
    if (stl.maxWidth) style += `max-width:${stl.maxWidth};`;
    if (stl.maxHeigh) style += `max-height:${stl.maxHeight};`;
    if (stl.border) style += `border:${stl.border}px solid white;`;
    if (stl.padding) style += `padding:${stl.padding}px;`;
    if (stl.collapse) style += `border-collapse:${stl.collapse};`;
    if (stl.tableLayout) style += `table-layout:${stl.tableLayout};`;
    if (stl.display) style += `display:${stl.display};`;
    if (stl.position) style += `position:${stl.position};`;
    if (stl.top) style += `top:${stl.top};`;
    if (stl.left) style += `left:${stl.left};`;
    if (stl.bg) style += `background-color:${stl.bg};`;
    if (stl.overflow) style += `overflow:${stl.overflow};`;

    return style;
};

/**
 * div formatting
 * @param {} content 
 * @param {*} stl 
 * @returns 
 */
const format = function (content, stl = {}) {
    // styling
    const style = getStyle(stl);

    // generating html
    content = `<div style='${style}'>${content}</div>`;
    return content;
};

/**
 * details formatting
 * @param {String} summary 
 * @param {String} content 
 * @param {Object} stl : style
 * @param {string} open if details is open by default
 * @returns string details
 */
const getDetails = function (summary, content, stl = {}, open=false) {
    // styling
    const style = getStyle(stl);

    // generating html
    let text = `<summary>${summary}</summary>`;
    text += `<span>${content}</span>`;
    text = `<details ${open?"open ":""}style='${style}'>${text}</details>`;
    return text;
};

/**
 * td formatting
 * @param {String} content 
 * @param {Object} stl style
 * @param {Object} size rowspan, colspan
 * @returns string td
 */
const getCell = function (content, stl = {}, size = {}) {
    // styling
    const style = getStyle(stl);

    // sizing
    const sizing = `rowspan='${size.rowspan}' colspan='${size.colspan}'`;

    // generating html
    const cellText = `<td ${sizing} style='${style}'>${content}</td>`;

    return cellText;
}

/**
 * table formatting
 * @param {String[]} cells 
 * @param {Object} stls cell styles
 * @param {Object} sizes cell {rowspan, colspan}
 * @param {Object} tableStl table style (td and tables will both have 1px border 5px padding)
 * @returns 
 */
const getTable = function (cells, stls = undefined, sizes = undefined, tableStl = undefined) {
    // styling
    if (!tableStl) {
        tableStl = { width: "80vw", tableLayout:"fixed"};
    } 

    const style = `border:1px solid white;border-collapse:collapse;padding:5px;`;
    const tableStyle = getStyle(tableStl);

    // generating html
    let text = ``;
    // getting collumns, rows. undefined will be ignored
    for (let y in cells) {
        const line = cells[y];

        let lineText = ``;
        for (let x in line) {
            const content = line[x];

            if (content === undefined) continue;

            const cellStl = stls?stls[y][x]:{};
            const cellSize = sizes?sizes[y][x]:{};

            lineText += getCell(content, cellStl, cellSize);
        }
        text += `<tr>${lineText}</tr>`;
    }

    // making table
    text = `<table style='${tableStyle}'>${text}</table>`;
    text = `<style>table,td{${style}}</style>${text}`;

    return text;
}

module.exports = { getStyle, format, getDetails, getCell, getTable };