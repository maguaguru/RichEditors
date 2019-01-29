/*global define*/
define("model/CKEditorModel", [
    "underscore",
    "backbone"
], function (_, Backbone) {
    "use strict";

    return Backbone.Model.extend({ defaults:
          {config: {}}});
});