"use strict";
// Feel free to add a unique literal value to each type for a discriminated union
// Type predicate
function isMonitor(item) {
    return "resolution" in item;
}
function demoItem(item) {
    // Add code to narrow and describe the type here
    // Be sure to access unique variables of the type
    // Type predicate
    if (isMonitor(item)) {
        return `Monitor: ${item.manufacturer} ${item.resolution[0]}x${item.resolution[1]}`;
    }
    return "Talk about me";
}
let items = [
    {
        platform: "Windows",
        serial: "adlkhel32134ljd",
        year: 1998,
    },
    {
        serial: 74523342,
        numpad: true,
        manufacturer: "Gibble",
        language: "EN",
    },
    {
        serial: "ewjkh234521fj",
        resolution: [1280, 720],
        manufacturer: "Milmo",
        touch: false,
    },
];
for (let item of items) {
    console.log(demoItem(item));
}
