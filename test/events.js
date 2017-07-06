var vega = require('vega-dataflow');

var registry = {};

function events(source, type, filter) {
  var handlers = registry[source] || (registry[source] = {});
  handlers[type] = new vega.EventStream(filter);
  return handlers[type];
}

function fire(source, type, event) {
  var handlers = registry[source],
      handler = handlers && handlers[type];
  if (handler) handler.receive(event);
  if (this && this.run) this.run();
}

module.exports = {
  events: events,
  fire:   fire
};
