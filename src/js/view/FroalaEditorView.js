/*global define, require*/
require("./../../css/froalaEdiror.css");

define("view/FroalaEditorView", [
    "jquery",
    "backbone",
    "underscore",
    "./../model/FroalaEditorModel"
], function ($, Backbone, _, FroalaEditorModel) {
    "use strict";

    var config,
        froalaEditor;
    return Backbone.View.extend({

        /*
         * El - ссылка на DOM-элемент, в который представление
         * вставляет сформированное содержимое
         */
        el: "#editor-container",

        template: _.template("<div id='froalaeditor'></div>"),

        /*
         * Функция initialize вызывается при создании
         * экземпляра представления
         */
        initialize: function () {
            this.model = new FroalaEditorModel();
            config = this.model.get("config");
            this.render();
            this.initEditor();
        },

        initEditor: function () {
            // Console.log("this.config: ", JSON.stringify(config));
            froalaEditor = $("#froalaeditor");
            $(function () {
                froalaEditor.froalaEditor(config);
            });

            /*
             * FroalaEditor.on("froalaEditor.initialized", function (e, editor) {
             *     editor.html.set($(".was-report-content").html);
             * });
             */

            froalaEditor.on("froalaEditor.contentChanged", function () {
                var count = froalaEditor.froalaEditor("charCounter.count");
                if (count >= config.charCounterMax) {
                    alert("Character limit!");
                }
            });

            froalaEditor.on("froalaEditor.image.beforeUpload", function (e, editor, images) {
                if (images.length) {
                    // Create a File Reader.
                    var reader = new FileReader();

                    // Set the reader to insert images when they are loaded.
                    reader.onload = function (e) {
                        var result = e.target.result;
                        editor.image.insert(result, null, null, editor.image.get());
                    };

                    // Read image as base64.
                    reader.readAsDataURL(images[0]);
                }

                editor.popups.hideAll();

                // Stop default upload chain.
                return false;
            });

            this.setData();
            this.editorSwitchMode(false);
        },

        setData: function () {
            $("#froalaeditor").froalaEditor("html.set", $(".was-report-content").html());
        },

        getData: function () {
            return $("#froalaeditor").froalaEditor("html.get", true);
        },

        editorSwitchMode: function (editable) {
            console.log("Froala: editorSwitchMode: ", editable);
            if (editable) {
                froalaEditor.froalaEditor("toolbar.show");
                froalaEditor.froalaEditor("edit.on");
            } else {
                froalaEditor.froalaEditor("toolbar.hide");
                froalaEditor.froalaEditor("edit.off");
            }
        },

        /*
         * Для вызова jQuery функций представление Backbone
         * имеет свойство $el
         */
        render: function () {
            console.log("was-report-content.html: ", $(".was-report-content").html());
            this.$el.html(this.template());
            return this;
        }
    });

});