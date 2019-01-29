/*global define, require*/
require("./../../css/quillEditor.css");

define("view/QuillEditorView", [
    "jquery",
    "backbone",
    "underscore",
    "quill",
    "./../model/QuillEditorModel"
], function ($, Backbone, _, Quill, QuillEditorModel) {
    "use strict";

    var config,
        quill,
        CHARS_LIMIT = 30;
    return Backbone.View.extend({

        /*
         * El - ссылка на DOM-элемент, в который представление
         * вставляет сформированное содержимое
         */
        el: "#editor-container",

        template: _.template("<div id='quilleditor'></div>"),

        /*
         * Функция initialize вызывается при создании
         * экземпляра представления
         */
        initialize: function () {
            this.model = new QuillEditorModel();
            config = this.model.get("config");
            this.render();
            this.initEditor();
        },

        initEditor: function () {
            // Console.log("this.config: ", JSON.stringify(config));

            quill = new Quill("#quilleditor", config);
            quill.on("text-change", function (delta, old, source) {
                if (quill.getLength() >= CHARS_LIMIT) {
                    quill.deleteText(CHARS_LIMIT, quill.getLength());
                    console.log("delta: ", delta, " ,old: ", old, " ,source: ", source);
                    alert("Character limit!");
                }
            });
        },

        getData: function () {
            return quill.root.innerHTML;
        },

        editorSwitchMode: function (editable) {
            if (editable) {
                quill.enable(true);
            } else {
                quill.enable(false);
            }
        },

        /*
         * Для вызова jQuery функций представление Backbone
         * имеет свойство $el
         */
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

});