/*global require*/
/*eslint "new-cap": ["error", {capIsNewExceptions: ["Config"] }], no-alert: 0*/
require.config({
    baseUrl: "js/",
    paths: {
        jquery: "../../node_modules/jquery/dist/jquery.min",
        underscore: "./../../node_modules/underscore/underscore-min",
        backbone: "./../../node_modules/backbone/backbone-min"
    },
    map: {
        "*": { jquery: "jquery-private" },
        "jquery-private": { jquery: "jquery" }
    },
    shim: {
        underscore: { exports: "_" },
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        },
        jqueryUI: { deps: ["jquery"] }
    },
    waitSeconds: 0
});