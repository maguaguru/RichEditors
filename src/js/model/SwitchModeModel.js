/*global define*/
define("model/SwitchModeModel", [
    "underscore",
    "backbone"
], function (_, Backbone) {
    "use strict";

    return Backbone.Model.extend({
        defaults: {editableMode: false},
        initialize: function () {
            this.listenTo(this, "editorModeChanged", this.changeEditableMode);
        },
        changeEditableMode: function () {
            console.log("** changeEditableMode **")
            this.set({editableMode: !this.get("editableMode")});
            this.trigger("editorModeModel:updated");
        }
    });
});