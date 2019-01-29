/*global define*/

define("view/TinyMceEditorView", [
    "jquery",
    "underscore",
    "backbone",
    "tinymce",
    "./../model/TinyMceEditorModel"
], function ($,  _, Backbone, tinymce, TinyMceEditorModel) {
    "use strict";

    var config;
    return Backbone.View.extend({

        /*
         * El - ссылка на DOM-элемент, в который представление
         * вставляет сформированное содержимое
         */
        el: "#editor-container",

        template: _.template("<form method='post'>" +
                                "<div id='tinymce-editor'>" +
                                "</div>" +
                            "</form>"),

        /*
         * Функция initialize вызывается при создании
         * экземпляра представления
         */
        initialize: function () {
            this.model = new TinyMceEditorModel();
            config = this.model.get("config");
            this.render();
            this.initEditor();
        },

        initEditor: function () {
            tinymce.init(config);
            // tinymce.activeEditor.on("keyDown", function (e) {
            //     console.log("Element keyDown:", e.target.nodeName);
            // });
            //tinymce.on('setcontent beforeaddundo keyup', this.getStats);
        },

        getData: function () {
            return tinymce.activeEditor.getContent();
        },

        editorSwitchMode: function (editable) {
            if (editable) {


            } else {

            }
        },

        // Returns text statistics for the specified editor by id
        getStats: function (id) {
            var body = tinymce.get(id).getBody(),
                text = tinymce.trim(body.innerText || body.textContent);

            return {
                chars: text.length,
                words: text.split(/[\w\u2019\'-]+/).length
            };
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