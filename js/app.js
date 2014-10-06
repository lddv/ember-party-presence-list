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
  itemController: 'guest'
});

App.GuestController = Ember.ObjectController.extend({
  actions: {
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
