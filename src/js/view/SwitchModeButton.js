/*global define*/

define("view/SwitchModeButton", [
    "jquery",
    "underscore",
    "backbone"
], function ($, _, Backbone) {
    "use strict";

    return Backbone.View.extend({

        /*
         * El - ссылка на DOM-элемент, в который представление
         * вставляет сформированное содержимое
         */
        el: "#switchMode",

        template:  _.template("<button id='switchEditorMode' " +
          "class='btn m-l-1 m-y-1 btn-primary'>Edit</button></div>"),


        initialize: function () {
            this.render();
        },

        getTemplate: function () {
            console.log("editableMode", this.model.editableMode);
            var btnName;
            if (this.model.editableMode) {
                btnName = "Save";
            } else {
                btnName = "Edit";
            }

            return _.template("<button id='switchEditorMode' " +
              "class='btn m-l-1 m-y-1 btn-primary'>" + btnName + "</button></div>");
        },

        render: function () {
            this.template = this.getTemplate();
            this.$el.html(this.template());
            return this;
        }
    });

});