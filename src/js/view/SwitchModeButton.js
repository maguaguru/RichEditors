/*global define*/

define("view/SwitchModeButton", [
    "jquery",
    "underscore",
    "backbone"
], function ($, _, Backbone) {
    "use strict";
    var self;
    return Backbone.View.extend({

        el: "#switchMode",

        getButtonName: function () {
            return this.model.get("editableMode") ? "Save" : "Edit";
        },

        template: _.template("<button id='switchEditorMode' " +
          "class='btn m-l-1 m-y-1 btn-primary'><%= this.getButtonName() %></button></div>"),


        initialize: function () {
            this.listenTo(this.model, "editorModeModel:updated", this.render);
            this.render();
        },

        editorModeChanged: function () {
            console.log("## editorModeChanged ##")
            this.model.trigger("editorModeChanged");
        },

        render: function () {
            console.log("render" + this.model.get("editableMode"));
            this.$el.html(this.template());
            return this;
        }
    });

});