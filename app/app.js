(function() {
  app.views.app = Backbone.View.extend({
    el: "#pet-app",

    initialize: function(args) {
      this.petHouse = new app.collections.pets

      addPetView = _.bind(function(pet) {
        var petView = new app.views.pet({
          model: pet
        })
        this.$el.append(petView.render().el)
      }, this)

      this.petHouse.on("add", function(pet) {
        addPetView(pet)
        $(".pet-count").html(this.petHouse.size())
      }, this);

      this.petHouse.on("remove", function(pet) {
        $(".pet-count").html(this.petHouse.size())
      }, this);

      this.petHouse.on("reset", function(pet) {
        $(".pet-count").html(this.petHouse.size())
        this.petHouse.each(function(pet) {
          addPetView(pet)
        })
      }, this);

      $(".btn-adopt").click(_.bind(this.onAdoptPet, this))
      this.petHouse.fetch()
    },

    randomName: function(len, charSet) {
      charSet = charSet || 'abcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
      for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
      }
      return randomString;
    },

    onAdoptPet: function(event) {
      this.petHouse.create({
        name: this.randomName(7, "abcdefghijklmnopqrstuvwxyz") + this.randomName(3, "0123456789"),
      });
    }

  });

}).call(this);