// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

// npm compatibility
if (typeof define !== 'function') { var define = require('./requirejs-shim')(module); }

define([
    "./widget",
    "jquery",
    "bootstrap",
], function(widget, $){

    var ButtonView = widget.DOMWidgetView.extend({
        render: function() {
            /**
             * Called when view is rendered.
             */
            this.setElement($("<button />")
                .addClass('ipy-widget widget-button btn btn-default'));
            this.$el.attr("data-toggle", "tooltip");
            this.listenTo(this.model, 'change:button_style', function(model, value) {
                this.update_button_style();
            }, this);
            this.update_button_style('');

            this.update(); // Set defaults.
        },
        
        update: function() {
            /**
             * Update the contents of this view
             *
             * Called when the model is changed. The model may have been 
             * changed by another view or by a state update from the back-end.
             */
            this.$el.prop("disabled", this.model.get("disabled"));
            this.$el.attr("title", this.model.get("tooltip"));

            var description = this.model.get("description");
            var icon = this.model.get("icon");
            if (description.trim().length === 0 && icon.trim().length ===0) {
                this.$el.html("&nbsp;"); // Preserve button height
            } else {
                this.$el.text(description);
                $('<i class="fa"></i>').prependTo(this.$el).addClass(icon);
            }

            return ButtonView.__super__.update.apply(this);
        },

        update_button_style: function(previous_trait_value) {
            var class_map = {
                primary: ['btn-primary'],
                success: ['btn-success'],
                info: ['btn-info'],
                warning: ['btn-warning'],
                danger: ['btn-danger']
            };
            this.update_mapped_classes(class_map, 'button_style', previous_trait_value);
        },

        events: {
            // Dictionary of events and their handlers.
            'click': '_handle_click',
        },
        
        _handle_click: function() {
            /**
             * Handles when the button is clicked.
             */
            this.send({event: 'click'});
        },
    });

    return {
        'ButtonView': ButtonView,
    };
});
