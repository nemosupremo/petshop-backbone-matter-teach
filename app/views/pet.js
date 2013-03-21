(function() {
  window.app.views.pet = Backbone.View.extend({
    events: {
      "change .pet-name": "renamePet",
      "click .btn-feed" : "feedPet",
      "click .btn-abuse": "abusePet",
      "click .btn-pound": "poundPet",
    },

    initialize: function(args) {
      var source = $("#pet-template").html();
      this.template = Handlebars.compile(source);

      this.model.on("change", this.render, this)
      this.model.on("destroy", function() {
        this.remove()
      }, this);
    },

    renamePet: function(event) {
      newName = $(event.currentTarget).val()
      if (newName != "") {
        this.model.set("name", newName)
      }
    },

    feedPet: function(event) {
      this.model.set("health", Math.min(this.model.get("health")+1, this.model.get("max_health")));
      // this.model.save()
    },

    abusePet: function(event) {
      this.model.set("health", Math.max(this.model.get("health")-1, 0));
    },

    poundPet: function(event) {
      this.model.destroy();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this
    },
  })
}).call(this);