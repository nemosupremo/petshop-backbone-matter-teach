(function() {
 window.app.collections.pets = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("matter-backbone-teach-pets"),
    model: window.app.models.pet,
 })
}).call(this);