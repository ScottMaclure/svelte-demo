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
    }
  }
}());

function create_main_fragment ( state, component ) {
	var h1, text, text_1_value, text_1, text_2, p, text_3, text_4_value, text_4, text_5, button, text_6, text_7, button_1, text_8, text_9, table, thead, th, text_10, text_11, th_1, text_12, text_13, th_2, text_14, text_15, th_3, text_16, text_17, th_4, text_18, text_20, tbody;

	function click_handler ( event ) {
		var state = component.get();
		component.doInc(state.count);
	}

	function click_handler_1 ( event ) {
		component.set({ count: 0 });
	}

	function get_block ( state ) {
		if ( state.items && state.items.length > 0 ) return create_if_block;
		return create_if_block_1;
	}

	var current_block = get_block( state );
	var if_block = current_block( state, component );

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
			table = createElement( 'table' );
			thead = createElement( 'thead' );
			th = createElement( 'th' );
			text_10 = createText( "Id" );
			text_11 = createText( "\n    " );
			th_1 = createElement( 'th' );
			text_12 = createText( "First Name" );
			text_13 = createText( "\n    " );
			th_2 = createElement( 'th' );
			text_14 = createText( "Last Name" );
			text_15 = createText( "\n    " );
			th_3 = createElement( 'th' );
			text_16 = createText( "Email" );
			text_17 = createText( "\n    " );
			th_4 = createElement( 'th' );
			text_18 = createText( "Actions" );
			text_20 = createText( "\n  " );
			tbody = createElement( 'tbody' );
			if_block.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			addListener( button, 'click', click_handler );
			addListener( button_1, 'click', click_handler_1 );
			table.border = "1";
			setAttribute( table, 'width', "100%" );
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
			insertNode( table, target, anchor );
			appendNode( thead, table );
			appendNode( th, thead );
			appendNode( text_10, th );
			appendNode( text_11, thead );
			appendNode( th_1, thead );
			appendNode( text_12, th_1 );
			appendNode( text_13, thead );
			appendNode( th_2, thead );
			appendNode( text_14, th_2 );
			appendNode( text_15, thead );
			appendNode( th_3, thead );
			appendNode( text_16, th_3 );
			appendNode( text_17, thead );
			appendNode( th_4, thead );
			appendNode( text_18, th_4 );
			appendNode( text_20, table );
			appendNode( tbody, table );
			if_block.mount( tbody, null );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = state.name ) ) {
				text_1.data = text_1_value;
			}

			if ( text_4_value !== ( text_4_value = state.count ) ) {
				text_4.data = text_4_value;
			}

			if ( current_block === ( current_block = get_block( state ) ) && if_block ) {
				if_block.update( changed, state );
			} else {
				if_block.unmount();
				if_block.destroy();
				if_block = current_block( state, component );
				if_block.create();
				if_block.mount( tbody, null );
			}
		},

		unmount: function () {
			detachNode( h1 );
			detachNode( text_2 );
			detachNode( p );
			detachNode( text_9 );
			detachNode( table );
			if_block.unmount();
		},

		destroy: function () {
			removeListener( button, 'click', click_handler );
			removeListener( button_1, 'click', click_handler_1 );
			if_block.destroy();
		}
	};
}

function create_each_block ( state, each_block_value, item, item_index, component ) {
	var tr, td, text_value, text, text_1, td_1, text_2_value, text_2, text_3, td_2, text_4_value, text_4, text_5, td_3, text_6_value, text_6, text_7, td_4, button, text_8;

	return {
		create: function () {
			tr = createElement( 'tr' );
			td = createElement( 'td' );
			text = createText( text_value = item.id );
			text_1 = createText( "\n            " );
			td_1 = createElement( 'td' );
			text_2 = createText( text_2_value = item.firstName );
			text_3 = createText( "\n            " );
			td_2 = createElement( 'td' );
			text_4 = createText( text_4_value = item.lastName );
			text_5 = createText( "\n            " );
			td_3 = createElement( 'td' );
			text_6 = createText( text_6_value = item.email );
			text_7 = createText( "\n            " );
			td_4 = createElement( 'td' );
			button = createElement( 'button' );
			text_8 = createText( "Delete" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			addListener( button, 'click', click_handler );

			button._svelte = {
				component: component,
				each_block_value: each_block_value,
				item_index: item_index
			};
		},

		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
			appendNode( td, tr );
			appendNode( text, td );
			appendNode( text_1, tr );
			appendNode( td_1, tr );
			appendNode( text_2, td_1 );
			appendNode( text_3, tr );
			appendNode( td_2, tr );
			appendNode( text_4, td_2 );
			appendNode( text_5, tr );
			appendNode( td_3, tr );
			appendNode( text_6, td_3 );
			appendNode( text_7, tr );
			appendNode( td_4, tr );
			appendNode( button, td_4 );
			appendNode( text_8, button );
		},

		update: function ( changed, state, each_block_value, item, item_index ) {
			if ( text_value !== ( text_value = item.id ) ) {
				text.data = text_value;
			}

			if ( text_2_value !== ( text_2_value = item.firstName ) ) {
				text_2.data = text_2_value;
			}

			if ( text_4_value !== ( text_4_value = item.lastName ) ) {
				text_4.data = text_4_value;
			}

			if ( text_6_value !== ( text_6_value = item.email ) ) {
				text_6.data = text_6_value;
			}

			button._svelte.each_block_value = each_block_value;
			button._svelte.item_index = item_index;
		},

		unmount: function () {
			detachNode( tr );
		},

		destroy: function () {
			removeListener( button, 'click', click_handler );
		}
	};
}

function create_if_block_2 ( state, component ) {
	var span, text;

	return {
		create: function () {
			span = createElement( 'span' );
			text = createText( "Loading..." );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			span.className = "loading";
		},

		mount: function ( target, anchor ) {
			insertNode( span, target, anchor );
			appendNode( text, span );
		},

		unmount: function () {
			detachNode( span );
		},

		destroy: noop
	};
}

function create_if_block_3 ( state, component ) {
	var text, button, text_1;

	function click_handler_1 ( event ) {
		component.requestData();
	}

	return {
		create: function () {
			text = createText( "No rows present.\n            " );
			button = createElement( 'button' );
			text_1 = createText( "Load" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			addListener( button, 'click', click_handler_1 );
		},

		mount: function ( target, anchor ) {
			insertNode( text, target, anchor );
			insertNode( button, target, anchor );
			appendNode( text_1, button );
		},

		unmount: function () {
			detachNode( text );
			detachNode( button );
		},

		destroy: function () {
			removeListener( button, 'click', click_handler_1 );
		}
	};
}

function create_if_block ( state, component ) {
	var each_block_anchor;

	var each_block_value = state.items;

	var each_block_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
	}

	return {
		create: function () {
			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].create();
			}

			each_block_anchor = createComment();
		},

		mount: function ( target, anchor ) {
			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].mount( target, anchor );
			}

			insertNode( each_block_anchor, target, anchor );
		},

		update: function ( changed, state ) {
			var each_block_value = state.items;

			if ( 'items' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_iterations[i] ) {
						each_block_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
						each_block_iterations[i].create();
						each_block_iterations[i].mount( each_block_anchor.parentNode, each_block_anchor );
					}
				}

				for ( ; i < each_block_iterations.length; i += 1 ) {
					each_block_iterations[i].unmount();
					each_block_iterations[i].destroy();
				}
				each_block_iterations.length = each_block_value.length;
			}
		},

		unmount: function () {
			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].unmount();
			}

			detachNode( each_block_anchor );
		},

		destroy: function () {
			destroyEach( each_block_iterations, false, 0 );
		}
	};
}

function create_if_block_1 ( state, component ) {
	var tr, td;

	function get_block ( state ) {
		if ( state.isLoading ) return create_if_block_2;
		return create_if_block_3;
	}

	var current_block = get_block( state );
	var if_block_1 = current_block( state, component );

	return {
		create: function () {
			tr = createElement( 'tr' );
			td = createElement( 'td' );
			if_block_1.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			td.colSpan = "5";
		},

		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
			appendNode( td, tr );
			if_block_1.mount( td, null );
		},

		update: function ( changed, state ) {
			if ( current_block !== ( current_block = get_block( state ) ) ) {
				if_block_1.unmount();
				if_block_1.destroy();
				if_block_1 = current_block( state, component );
				if_block_1.create();
				if_block_1.mount( td, null );
			}
		},

		unmount: function () {
			detachNode( tr );
			if_block_1.unmount();
		},

		destroy: function () {
			if_block_1.destroy();
		}
	};
}

function click_handler ( event ) {
	var component = this._svelte.component;
	var each_block_value = this._svelte.each_block_value, item_index = this._svelte.item_index, item = each_block_value[item_index];
	component.deleteItem(item.id);
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

	this._fragment = create_main_fragment( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
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

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
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

function noop() {}

function createComment() {
	return document.createComment('');
}

function destroyEach(iterations, detach, start) {
	for (var i = start; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].destroy(detach);
	}
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

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

return HelloWorld;

}());