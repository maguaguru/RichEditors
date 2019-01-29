/*global define*/

define("view/CKEditorView", [
    "jquery",
    "backbone",
    "underscore",
    "@ckeditor/ckeditor5-build-classic",
    "./../model/CKEditorModel"
], function ($, Backbone, _, ClassicEditor, CKEditorModel) {
    "use strict";

    var config,
        editor,
        CHARS_LIMIT = 30;
    return Backbone.View.extend({

        /*
         * El - ссылка на DOM-элемент, в который представление
         * вставляет сформированное содержимое
         */
        el: "#editor-container",

        template: _.template("<div id='ckeditor'></div>"),

        /*
         * Функция initialize вызывается при создании
         * экземпляра представления
         */
        initialize: function () {

            this.model = new CKEditorModel();
            config = this.model.get("config");
            this.render();
            this.initEditor();
        },

        initEditor: function () {
            console.log("this.ClassicEditor: ", ClassicEditor);

            ClassicEditor.create(document.querySelector("#ckeditor")).then(function (newEditor) {
                editor = newEditor;
            })
                .catch(function (error) {
                    console.error(error);
                });

            //editor.plugins.addExternal("ckeditor_wiris", "https://www.wiris.net/demo/plugins/ckeditor/", "plugin.js");
        },

        getData: function () {
            return editor.getData();
        },

        editorSwitchMode: function (editable) {
            if (editable) {


            } else {

            }
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

});