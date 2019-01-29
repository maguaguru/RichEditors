/*global define*/
define("model/QuillEditorModel", [
    "underscore",
    "backbone"
], function (_, Backbone) {
    "use strict";

    var toolbarOptions = [
        [
            "bold",
            "italic",
            "underline",
            "strike"
        ], // Toggled buttons
        [
            "blockquote",
            "code-block"
        ],

        [
            { header: 1 },
            { header: 2 }
        ], // Custom button values
        [
            { list: "ordered"},
            { list: "bullet" }
        ],
        [
            { script: "sub"},
            { script: "super" }
        ], // Superscript/subscript
        [
            { indent: "-1"},
            { indent: "+1" }
        ], // Outdent/indent
        [{ direction: "rtl" }], // Text direction

        [
            { size: [
                "small",
                false,
                "large",
                "huge"
            ] }
        ], // Custom dropdown
        [
            { header: [
                1,
                2,
                3,
                4,
                5,
                6,
                false
            ] }
        ],

        [
            { color: [] },
            { background: [] }
        ], // Dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        [
            "image",
            "code-block"
        ],
        ['formula'],

        ["clean"] // Remove formatting button
    ];
    return Backbone.Model.extend({ defaults:
          {config: {
              modules: {
                  formula: true,
                  toolbar: toolbarOptions
              },
              theme: "snow"
          }}});
});