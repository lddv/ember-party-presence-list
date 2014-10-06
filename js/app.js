var App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

// ROUTER
App.Router.map(function() {
  this.resource('guests', { path: '/' });
});

App.GuestsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('guest');
  }
});

// CONTROLLER
App.GuestsController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  itemController: 'guest',

  searchFilter: '',
  filteredPeople: Ember.computed.filter('model', function(person){
      var searchFilter = this.get('searchFilter');
      var regex = new RegExp(searchFilter, 'i');
      return person.name.match(regex);
  }).property('model','searchFilter'),

  actions: {
    createGuest: function(){}
  }
});

App.GuestController = Ember.ObjectController.extend({
  isEditing: false,

  actions: {
    editName: function(){
      this.set('isEditing', true);
    },
    acceptChanges: function(){
      this.set('isEditing', false);

      if (Ember.isEmpty(this.get('model.name'))) {
        this.send('removeGuest');
      } else {
        this.get('model').save();
      }
    },
    removeGuest: function () {
      var guest = this.get('model');
      guest.deleteRecord();
      guest.save();
    },

    toggleAttendance: function(value){
      var guest = this.get('model');
      guest.set('guestHasAttended', value);
    }
  }
});

// MODEL
App.Guest = DS.Model.extend({
  name: DS.attr('string'),
  guestHasAttended: DS.attr('boolean')
});

App.Guest.FIXTURES = [
{
  id: 1,
  name: 'Leonardo',
  guestHasAttended: false
}, {
  id: 2,
  name: 'Denise',
  guestHasAttended: false
}, {
  id: 3,
  name: 'Antonio',
  guestHasAttended: false
}, {
  id: 4,
  name: 'Leticia',
  guestHasAttended: false
}];


// COPY & PASTE STUFF

// EXACT CHARACTERS FILTERING
// filteredList: function(){
//   var list = this.get('list'),
//       filter = this.get('filter');

//   if (!filter) { return list; }

//   return list.filter(function(item) {
//     return item.name.indexOf(filter) !== -1;
//   });
// }.property('list.@each', 'filter'),

// SEARCH BAR LAYOUT
    // <nav class="navbar navbar-default" role="navigation">
    //   <form class="navbar-form navbar-left" role="search">
    //     <div class="form-group">
    //       {{input type="text" class="form-control guest-search" placeholder="Search" value=searchFilter}}
    //     </div>
    //   </form>
    // </nav>

