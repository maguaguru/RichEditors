/*global define*/
define("model/TinyMceEditorModel", [
    "underscore",
    "backbone",
    "tinymce"
], function (_, Backbone, tinymce) {
    "use strict";

    return Backbone.Model.extend({ defaults:
          {config: {
              selector: "#tinymce-editor",
              paste_data_images: true,
              plugins: "image wordcount paste",
              external_plugins: {tiny_mce_wiris: "https://www.wiris.net/demo/plugins/tiny_mce/plugin.js"},
              toolbar: "formatselect | bold italic strikethrough forecolor backcolor | " +
                "link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |" +
                " removeformat | image | tiny_mce_wiris_formulaEditor,tiny_mce_wiris_formulaEditorChemistry"
          }}});
});