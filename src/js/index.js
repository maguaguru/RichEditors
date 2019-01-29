/*global require, alert*/

require("./../css/index.css");

var Handlebars = require("handlebars-template-loader/runtime");
Handlebars.registerHelper({

    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function () {
        var result = true,
            index = 0;

        for (index; index < arguments.length; index++) {
            if (typeof arguments[index] === "boolean") {
                result = result && arguments[index];
            }
        }
        return result;
    },
    or: function () {
        var result = false,
            index = 0;

        for (index; index < arguments.length; index++) {
            if (typeof arguments[index] === "boolean") {
                result = result || arguments[index];
            }
        }
        return result;
    },
    startsWith: function (str, what) {
        return str.indexOf(what) === 0;
    },
    replace: function (expr, mode, to) {
        var modes = {alphanumeric: /[^a-zA-Z\d]/g};

        return expr.toString().replace(modes[mode.toString()], to.toString());
    },
    percent: function (value) {
        return Math.round(value * 100);
    }
});

var Backbone = require("backbone"),
    _ = require("underscore"),
    katex = require("katex"),
    questionTemplate = require("./../templates/questiontemplate.hbs"),
    tinymce = require("tinymce"),
    froalaEditorData = require("froala-editor/js/froala_editor.pkgd.min"),
    wiris = require("@wiris/mathtype-froala/wiris"),
    SwitchModeButton = require("./view/SwitchModeButton"),
    SwitchModeModel = require("./model/SwitchModeModel"),
    FroalaEditorView = require("./view/FroalaEditorView"),
    QuillEditorView = require("./view/QuillEditorView"),
    TinyMceEditorView = require("./view/TinyMceEditorView"),
    CKEditorView = require("./view/CKEditorView"),
    AppView,
    appView,
    switchModeModel,
    switchModeButton,
    rishEditor,
    editableMode = false;


/*
 * Function init () {
 *     "use strict";
 */
AppView = Backbone.View.extend({

    /*
     * El - ссылка на DOM-элемент, в который представление
     * вставляет сформированное содержимое
     */
    el: ".was-content",

    template: "",

    /*
     * Функция initialize вызывается при создании
     * экземпляра представления
     */
    initialize: function () {
        this.template = _.template(questionTemplate({
            editorName: this.model.editor,
            editorTitle: this.model.title,
            editableMode: editableMode
        }));
        this.render();
        this.renderSwitchModeButton();
        this.initEditor();
    },
    events: {
        "click .qti-submit-answer": "getEditorData",
        "mouseup #switchEditorMode": "switchEditorMode",
        "click #getQuillEditor": "showQuillEditor",
        "click #getCKEditor": "showCKEditor",
        "click #getFroalaEditor": "showFroalaEditor",
        "click #getTinyMceEditor": "showTinyMceEditor"
    },

    renderSwitchModeButton: function () {
        if (switchModeModel && switchModeButton) {
            switchModeButton.remove();
            switchModeModel = null;
            switchModeButton = null;
        }
        switchModeModel = new SwitchModeModel();
        switchModeButton = new SwitchModeButton({ model: switchModeModel});
    },

    showQuillEditor: function () {
        Backbone.history.navigate("quillEditorPage", { trigger: true });
    },

    showCKEditor: function () {
        Backbone.history.navigate("ckEditorPage", { trigger: true });
    },

    showFroalaEditor: function () {
        Backbone.history.navigate("froalaEditorPage", { trigger: true });
    },

    showTinyMceEditor: function () {
        Backbone.history.navigate("tinyMceEditorPage", { trigger: true });
    },

    switchEditorMode: function () {
        editableMode = !editableMode;
        if (!editableMode) {
            this.getEditorData();
        }
        switchModeButton.editorModeChanged();
        rishEditor.editorSwitchMode(editableMode);

        /*
         * This.initEditor();
         * rishEditor.editorSwitchMode(editableMode);
         * rishEditor.setData(data);
         * this.getEditorData();
         */
    },

    getEditorData: function () {
        $(".was-report-content").text(rishEditor.getData());
    },

    initEditor: function () {
        if (this.model.editor === "quill") {
            rishEditor = new QuillEditorView({});
        } else if (this.model.editor === "ckeditor") {
            rishEditor = new CKEditorView({});
        } else if (this.model.editor === "froala") {
            rishEditor = new FroalaEditorView({});
        } else if (this.model.editor === "tinymce") {
            rishEditor = new TinyMceEditorView({});
        }
    },

    destroy: function() {
        this.undelegateEvents();
    },

    render: function () {
        this.$el.html(this.template());
        this.delegateEvents();
        return this;
    }
});

var QuillEditorPage = Backbone.View.extend({
        initialize: function () {
        // Initialize will render the view
            this.render();
        },

        render: function () {
            $("body").empty();
            if (appView) {
                appView.destroy();
                appView = null;
            }
            appView = new AppView({model: {
                editor: "quill",
                title: "Quill Editor example"
            }});

        }
    }),

    CkEditorPage = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            $("body").empty();
            if (appView) {
                appView.destroy();
                appView = null;
            }
            appView = new AppView({model: {
                editor: "ckeditor",
                title: "CKEditor example"
            }});
        }
    }),

    FroalaEditorPage = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            $("body").empty();
            if (appView) {
                appView.destroy();
                appView = null;
            }
            appView = new AppView({model: {
                editor: "froala",
                title: "Froala editor example"
            }});
        }
    }),

    TinyMceEditorPage = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            $("body").empty();
            if (appView) {
                appView.destroy();
                appView = null;
            }
            appView = new AppView({model: {
                editor: "tinymce",
                title: "TinyMCE editor example"
            }});
        }
    }),

    Router = Backbone.Router.extend({
        routes: {
            quillEditorPage: "displayQuillEditor",
            ckEditorPage: "displayCkEditor",
            froalaEditorPage: "displayFroalaEditor",
            tinyMceEditorPage: "displayTinyMceEditor"
        },

        displayQuillEditor: function () {
            var quillEditorPage = new QuillEditorPage();
        },

        displayCkEditor: function () {
            var ckEditorPage = new CkEditorPage();
        },

        displayFroalaEditor: function () {
            var froalaEditorPage = new FroalaEditorPage();
        },

        displayTinyMceEditor: function () {
            var tinyMceEditorPage = new TinyMceEditorPage();
        }
    }),

    router = new Router();


$(document).ready(function () {
    window.katex = katex;

    // Start the browser History
    Backbone.history.start();

    // Display navigate to pageOne on page load
    router.navigate("quillEditorPage", { trigger: true });
    // Init();
});
