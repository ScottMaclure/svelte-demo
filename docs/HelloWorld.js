var HelloWorld = (function () { 'use strict';

var template = (function () {
  return {
    data () {
      return {
        isLoading: false,
        count: 0,
        items: []
      }
    },
    methods: {
        doInc: function (count) {
            // TODO emit semantic event and get index.html to update localStorage, so the component knows nothing!
            window.localStorage.count = parseInt(count, 10) + 1
            this.set({ count: window.localStorage.count })
        },
        // TODO Demonstrate sharing this code between Users component and something else.
        deleteItem: function (id) {
            console.log('Deleting id=%d.', id)
            let items = this.get('items').filter(function (item) {
              return item.id !== id
            })
            this.set({ items:  items })
            console.log('Done.')
        },
        requestData: function () {
          this.set({ isLoading: true })
          this.fire('requestData')
        },
        setData: function (data) {
          data.isLoading = false
          this.set(data)
        }
    },
    components: {
      Users
    }
  }
}());

function create_main_fragment ( state, component ) {
	var h1, text, text_1_value, text_1, text_2, p, text_3, text_4_value, text_4, text_5, button, text_6, text_7, button_1, text_8, text_9;

	function click_handler ( event ) {
		var state = component.get();
		component.doInc(state.count);
	}

	function click_handler_1 ( event ) {
		component.set({ count: 0 });
	}

	var users = new template.components.Users({
		_root: component._root,
		data: {
			isLoading: state.isLoading,
			items: state.items
		}
	});

	users.on( 'requestData', function ( event ) {
		component.requestData();
	});

	users.on( 'deleteItem', function ( event ) {
		component.deleteItem(event.id);
	});

	return {
		create: function () {
			h1 = createElement( 'h1' );
			text = createText( "Hello " );
			text_1 = createText( text_1_value = state.name );
			text_2 = createText( "\n" );
			p = createElement( 'p' );
			text_3 = createText( "Count: " );
			text_4 = createText( text_4_value = state.count );
			text_5 = createText( " " );
			button = createElement( 'button' );
			text_6 = createText( "Increment" );
			text_7 = createText( " " );
			button_1 = createElement( 'button' );
			text_8 = createText( "Reset" );
			text_9 = createText( "\n\n\n\n" );
			users._fragment.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			addListener( button, 'click', click_handler );
			addListener( button_1, 'click', click_handler_1 );
		},

		mount: function ( target, anchor ) {
			insertNode( h1, target, anchor );
			appendNode( text, h1 );
			appendNode( text_1, h1 );
			insertNode( text_2, target, anchor );
			insertNode( p, target, anchor );
			appendNode( text_3, p );
			appendNode( text_4, p );
			appendNode( text_5, p );
			appendNode( button, p );
			appendNode( text_6, button );
			appendNode( text_7, p );
			appendNode( button_1, p );
			appendNode( text_8, button_1 );
			insertNode( text_9, target, anchor );
			users._fragment.mount( target, anchor );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = state.name ) ) {
				text_1.data = text_1_value;
			}

			if ( text_4_value !== ( text_4_value = state.count ) ) {
				text_4.data = text_4_value;
			}

			var users_changes = {};

			if ( 'isLoading' in changed ) users_changes.isLoading = state.isLoading;
			if ( 'items' in changed ) users_changes.items = state.items;

			if ( Object.keys( users_changes ).length ) users.set( users_changes );
		},

		unmount: function () {
			detachNode( h1 );
			detachNode( text_2 );
			detachNode( p );
			detachNode( text_9 );
			users._fragment.unmount();
		},

		destroy: function () {
			removeListener( button, 'click', click_handler );
			removeListener( button_1, 'click', click_handler_1 );
			users.destroy( false );
		}
	};
}

function HelloWorld ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	this._oncreate = [];

	this._fragment = create_main_fragment( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}

	callAll(this._oncreate);
}

assign( HelloWorld.prototype, template.methods, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set
 });

HelloWorld.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	callAll(this._oncreate);
};

HelloWorld.prototype.teardown = HelloWorld.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	callAll(this._root._oncreate);
}

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (differs(newValue, oldValue)) {
			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

return HelloWorld;

}());