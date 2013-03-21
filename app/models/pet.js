(function() {
   window.app.models.pet = Backbone.Model.extend({
    defaults: function() {
      return {
        image: "pet.png",
        max_health: 10,
        health: 10,
      };
    },

    initialize: function() {
      this.on("change", _.throttle(function() {this.save()}, 250), this);
    },
   })
}).call(this);