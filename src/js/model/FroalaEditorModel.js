/*global define*/
define("model/FroalaEditorModel", [
    "underscore",
    "backbone"
], function (_, Backbone) {
    "use strict";


    return Backbone.Model.extend({ defaults:
          {config: {
              // InitOnClick: true,
              charCounterMax: 30,
              toolbarButtons: [
                  "undo",
                  "redo",
                  "|",
                  "bold",
                  "italic",
                  "underline",
                  "strikeThrough",
                  "subscript",
                  "superscript",
                  "outdent",
                  "indent",
                  "clearFormatting",
                  "insertTable",
                  "html",
                  "insertImage",
                  "wirisEditor",
                  "wirisChemistry"
              ],
              toolbarButtonsMD: [
                  "wirisEditor",
                  "wirisChemistry"
              ],
              toolbarButtonsSM: [
                  "wirisEditor",
                  "wirisChemistry"
              ],
              toolbarButtonsXS: [
                  "wirisEditor",
                  "wirisChemistry"
              ],
              imageEditButtons: [
                  "wirisEditor",
                  "wirisChemistry"
              ],
              htmlAllowedTags: [".*"],
              htmlAllowedAttrs: [".*"],
              useClasses: false
          }}});
});