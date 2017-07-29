(function () {
'use strict';

const ROUTE_DEFAULT = 'Splash';

var Config = {
    routes: {
        default: ROUTE_DEFAULT,
        splash: ROUTE_DEFAULT,
        listUsers: 'ListUsers',
        editUser: 'EditUser',
        testBroken: 'TestBroken'
    },
    unicodes: {
        delete: '\u274C',
        edit: '\u270E'
    }
};

function noop() {}

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

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function destroyEach(iterations, detach, start) {
	for (var i = start; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].destroy(detach);
	}
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
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
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

var proto = {
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set
};

var template$1 = (function () {
return {
  data () {
    return {
      name: 'TBC',
      count: 0
    }
  },
  methods: {
    // TODO emit semantic event and get index.html to update localStorage, so the component knows nothing!
    doInc: function (count) {
      window.localStorage.count = parseInt(count, 10) + 1;
      this.set({ count: window.localStorage.count });
    },
    // TODO Push reset up to main.js also, rather than hiding localStorage in here.
    resetCount: function () {
      window.localStorage.count = 0;
      this.set({ count: 0 });
    }
  }
}
}());

function create_main_fragment$1 ( state, component ) {
	var div, h1, text, text_1_value, text_1, text_2, p, text_3, text_4_value, text_4, text_5, button, text_6, text_7, button_1, text_8;

	function click_handler ( event ) {
		var state = component.get();
		component.doInc(state.count);
	}

	function click_handler_1 ( event ) {
		component.resetCount();
	}

	return {
		create: function () {
			div = createElement( 'div' );
			h1 = createElement( 'h1' );
			text = createText( "Hello " );
			text_1 = createText( text_1_value = state.name );
			text_2 = createText( "\n  " );
			p = createElement( 'p' );
			text_3 = createText( "Count: " );
			text_4 = createText( text_4_value = state.count );
			text_5 = createText( "\n    " );
			button = createElement( 'button' );
			text_6 = createText( "Increment" );
			text_7 = createText( "\n    " );
			button_1 = createElement( 'button' );
			text_8 = createText( "Reset" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			div.className = "splash";
			addListener( button, 'click', click_handler );
			addListener( button_1, 'click', click_handler_1 );
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( h1, div );
			appendNode( text, h1 );
			appendNode( text_1, h1 );
			appendNode( text_2, div );
			appendNode( p, div );
			appendNode( text_3, p );
			appendNode( text_4, p );
			appendNode( text_5, p );
			appendNode( button, p );
			appendNode( text_6, button );
			appendNode( text_7, p );
			appendNode( button_1, p );
			appendNode( text_8, button_1 );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = state.name ) ) {
				text_1.data = text_1_value;
			}

			if ( text_4_value !== ( text_4_value = state.count ) ) {
				text_4.data = text_4_value;
			}
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: function () {
			removeListener( button, 'click', click_handler );
			removeListener( button_1, 'click', click_handler_1 );
		}
	};
}

function Splash ( options ) {
	options = options || {};
	this._state = assign( template$1.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment$1( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
}

assign( Splash.prototype, template$1.methods, proto );

Splash.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Splash.prototype.teardown = Splash.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var template$2 = (function () {
    const FILTER_WAIT = 250;

    var timer;

    return {
        data () {
            return {
                filter: ''
            }
        },
        methods: {
            /**
             * Only fire after a certain number of characters have been typed.
             * Wait before firing the event, to debounce.
             */
            possibleFilter: function (event) {
                var self = this;

                window.clearTimeout(timer);

                let filterValue = event.target.value.trim();

                // TODO MIN_FILTER_LENGTH check here, but how to handle delete actions?

                timer = setTimeout(function () {
                    self.fire('filterData', { filter: filterValue });
                }, FILTER_WAIT);

            }
        }
    }
}());

function create_main_fragment$3 ( state, component ) {
	var div, label, text, text_1, input, input_value_value;

	function keyup_handler ( event ) {
		component.possibleFilter(event);
	}

	return {
		create: function () {
			div = createElement( 'div' );
			label = createElement( 'label' );
			text = createText( "Filter:" );
			text_1 = createText( "\n    " );
			input = createElement( 'input' );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-2175086471', '' );
			div.className = "filters";
			label.htmlFor = "filter";
			input.type = "text";
			input.id = "filter";
			input.name = "filter";
			input.value = input_value_value = state.filter;
			addListener( input, 'keyup', keyup_handler );
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( label, div );
			appendNode( text, label );
			appendNode( text_1, div );
			appendNode( input, div );
		},

		update: function ( changed, state ) {
			if ( input_value_value !== ( input_value_value = state.filter ) ) {
				input.value = input_value_value;
			}
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: function () {
			removeListener( input, 'keyup', keyup_handler );
		}
	};
}

function Filters ( options ) {
	options = options || {};
	this._state = assign( template$2.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment$3( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
}

assign( Filters.prototype, template$2.methods, proto );

Filters.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Filters.prototype.teardown = Filters.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function recompute$1 ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'items' in newState && differs( state.items, oldState.items ) ) || ( 'sorting' in newState && differs( state.sorting, oldState.sorting ) ) ) {
		state.processedItems = newState.processedItems = template$3.computed.processedItems( state.items, state.sorting );
	}
}

var template$3 = (function () {
    return {
        data() {
            return {
                unicodes: Config.unicodes,
                isLoading: false,
                items: [],
                sorting: {
                    active: true,
                    fieldName: 'id',
                    order: 'asc'
                },
                utfShapes: {
                    invis: '\u2063',
                    asc: '\u25B4',
                    desc: '\u25BE'
                }
            }
        },
        computed: {
            /**
             * TODO What's more efficient - computed property or a methods function?
             */
            processedItems: (items, sorting) => (
                items.sort((a, b) => {
                    let aV = a[sorting.fieldName];
                    let bV = b[sorting.fieldName];
                    if (aV === bV) { return 0; } // same value
                    // asc is default also.
                    let [lessThan, greaterThan] = (sorting.order === 'desc') ? [1, -1] : [-1, 1];
                    return (aV < bV) ? lessThan : greaterThan
                })
            )
        },
        helpers: {
            /**
             * Not a computed property - helper function with passed-in data context.
             */
            getSortIcon: function (fieldName, sorting, utfShapes) {
                if (!sorting.active) { return utfShapes.invis }
                if (sorting.fieldName !== fieldName) { return utfShapes.invis }
                // TODO per-field sorting values etc.
                return utfShapes[sorting.order]
            }
        },
        methods: {
            /**
             * When user changes sorting we only update the "sorting" meta-data.
             * The actual sorting happens as a computed property (processedItems).
             */
            sortItems: function(event, params) {
                event.preventDefault();
                this.fire('updateSorting', params);
            },
            doEditItem: function (event, item) {
                event.preventDefault();
                this.fire('editItem', { id: item.id });
            }
        }
    }
}());

function create_main_fragment$4 ( state, component ) {
	var div, table, thead, th, a, text, text_1_value, text_1, text_2, th_1, a_1, text_3, text_4_value, text_4, text_5, th_2, a_2, text_6, text_7_value, text_7, text_8, th_3, a_3, text_9, text_10_value, text_10, text_11, th_4, text_12, text_14, tbody;

	function click_handler ( event ) {
		component.sortItems(event, { fieldName: "id" });
	}

	function click_handler_1 ( event ) {
		component.sortItems(event, { fieldName: "firstName" });
	}

	function click_handler_2 ( event ) {
		component.sortItems(event, { fieldName: "lastName" });
	}

	function click_handler_3 ( event ) {
		component.sortItems(event, { fieldName: "email" });
	}

	function get_block ( state ) {
		if ( state.items && state.items.length > 0 ) return create_if_block$1;
		return create_if_block_1$1;
	}

	var current_block = get_block( state );
	var if_block = current_block( state, component );

	return {
		create: function () {
			div = createElement( 'div' );
			table = createElement( 'table' );
			thead = createElement( 'thead' );
			th = createElement( 'th' );
			a = createElement( 'a' );
			text = createText( "Id " );
			text_1 = createText( text_1_value = template$3.helpers.getSortIcon('id', state.sorting, state.utfShapes) );
			text_2 = createText( "\n            " );
			th_1 = createElement( 'th' );
			a_1 = createElement( 'a' );
			text_3 = createText( "First Name " );
			text_4 = createText( text_4_value = template$3.helpers.getSortIcon('firstName', state.sorting, state.utfShapes) );
			text_5 = createText( "\n            " );
			th_2 = createElement( 'th' );
			a_2 = createElement( 'a' );
			text_6 = createText( "Last Name " );
			text_7 = createText( text_7_value = template$3.helpers.getSortIcon('lastName', state.sorting, state.utfShapes) );
			text_8 = createText( "\n            " );
			th_3 = createElement( 'th' );
			a_3 = createElement( 'a' );
			text_9 = createText( "Email " );
			text_10 = createText( text_10_value = template$3.helpers.getSortIcon('email', state.sorting, state.utfShapes) );
			text_11 = createText( "\n            " );
			th_4 = createElement( 'th' );
			text_12 = createText( "Actions" );
			text_14 = createText( "\n\n        " );
			tbody = createElement( 'tbody' );
			if_block.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-1777175650', '' );
			div.className = "users";
			table.border = "1";
			setAttribute( table, 'width', "100%" );
			a.href = "#";
			addListener( a, 'click', click_handler );
			a_1.href = "#";
			addListener( a_1, 'click', click_handler_1 );
			a_2.href = "#";
			addListener( a_2, 'click', click_handler_2 );
			a_3.href = "#";
			addListener( a_3, 'click', click_handler_3 );
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( table, div );
			appendNode( thead, table );
			appendNode( th, thead );
			appendNode( a, th );
			appendNode( text, a );
			appendNode( text_1, a );
			appendNode( text_2, thead );
			appendNode( th_1, thead );
			appendNode( a_1, th_1 );
			appendNode( text_3, a_1 );
			appendNode( text_4, a_1 );
			appendNode( text_5, thead );
			appendNode( th_2, thead );
			appendNode( a_2, th_2 );
			appendNode( text_6, a_2 );
			appendNode( text_7, a_2 );
			appendNode( text_8, thead );
			appendNode( th_3, thead );
			appendNode( a_3, th_3 );
			appendNode( text_9, a_3 );
			appendNode( text_10, a_3 );
			appendNode( text_11, thead );
			appendNode( th_4, thead );
			appendNode( text_12, th_4 );
			appendNode( text_14, table );
			appendNode( tbody, table );
			if_block.mount( tbody, null );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = template$3.helpers.getSortIcon('id', state.sorting, state.utfShapes) ) ) {
				text_1.data = text_1_value;
			}

			if ( text_4_value !== ( text_4_value = template$3.helpers.getSortIcon('firstName', state.sorting, state.utfShapes) ) ) {
				text_4.data = text_4_value;
			}

			if ( text_7_value !== ( text_7_value = template$3.helpers.getSortIcon('lastName', state.sorting, state.utfShapes) ) ) {
				text_7.data = text_7_value;
			}

			if ( text_10_value !== ( text_10_value = template$3.helpers.getSortIcon('email', state.sorting, state.utfShapes) ) ) {
				text_10.data = text_10_value;
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
			detachNode( div );
			if_block.unmount();
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
			removeListener( a_1, 'click', click_handler_1 );
			removeListener( a_2, 'click', click_handler_2 );
			removeListener( a_3, 'click', click_handler_3 );
			if_block.destroy();
		}
	};
}

function create_each_block ( state, each_block_value, item, item_index, component ) {
	var tr, td, a, text_value, text, text_1, td_1, text_2_value, text_2, text_3, td_2, text_4_value, text_4, text_5, td_3, text_6_value, text_6, text_7, td_4, i, text_8_value, text_8, text_9, i_1, text_10_value, text_10;

	return {
		create: function () {
			tr = createElement( 'tr' );
			td = createElement( 'td' );
			a = createElement( 'a' );
			text = createText( text_value = item.id );
			text_1 = createText( "\n                        " );
			td_1 = createElement( 'td' );
			text_2 = createText( text_2_value = item.firstName );
			text_3 = createText( "\n                        " );
			td_2 = createElement( 'td' );
			text_4 = createText( text_4_value = item.lastName );
			text_5 = createText( "\n                        " );
			td_3 = createElement( 'td' );
			text_6 = createText( text_6_value = item.email );
			text_7 = createText( "\n                        " );
			td_4 = createElement( 'td' );
			i = createElement( 'i' );
			text_8 = createText( text_8_value = state.unicodes.edit );
			text_9 = createText( "\n                            " );
			i_1 = createElement( 'i' );
			text_10 = createText( text_10_value = state.unicodes.delete );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.href = "#";
			addListener( a, 'click', click_handler );

			a._svelte = {
				component: component,
				each_block_value: each_block_value,
				item_index: item_index
			};

			i.className = "noselect";
			addListener( i, 'click', click_handler_1 );

			i._svelte = {
				component: component,
				each_block_value: each_block_value,
				item_index: item_index
			};

			i_1.className = "noselect";
			addListener( i_1, 'click', click_handler_2 );

			i_1._svelte = {
				component: component,
				each_block_value: each_block_value,
				item_index: item_index
			};
		},

		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
			appendNode( td, tr );
			appendNode( a, td );
			appendNode( text, a );
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
			appendNode( i, td_4 );
			appendNode( text_8, i );
			appendNode( text_9, td_4 );
			appendNode( i_1, td_4 );
			appendNode( text_10, i_1 );
		},

		update: function ( changed, state, each_block_value, item, item_index ) {
			a._svelte.each_block_value = each_block_value;
			a._svelte.item_index = item_index;

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

			i._svelte.each_block_value = each_block_value;
			i._svelte.item_index = item_index;

			if ( text_8_value !== ( text_8_value = state.unicodes.edit ) ) {
				text_8.data = text_8_value;
			}

			i_1._svelte.each_block_value = each_block_value;
			i_1._svelte.item_index = item_index;

			if ( text_10_value !== ( text_10_value = state.unicodes.delete ) ) {
				text_10.data = text_10_value;
			}
		},

		unmount: function () {
			detachNode( tr );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
			removeListener( i, 'click', click_handler_1 );
			removeListener( i_1, 'click', click_handler_2 );
		}
	};
}

function create_if_block_2$1 ( state, component ) {
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

function create_if_block_3$1 ( state, component ) {
	var text, button, text_1;

	function click_handler_3 ( event ) {
		component.fire("requestData");
	}

	return {
		create: function () {
			text = createText( "No rows present.\n                            " );
			button = createElement( 'button' );
			text_1 = createText( "Load" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			addListener( button, 'click', click_handler_3 );
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
			removeListener( button, 'click', click_handler_3 );
		}
	};
}

function create_if_block$1 ( state, component ) {
	var each_block_anchor;

	var each_block_value = state.processedItems;

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
			var each_block_value = state.processedItems;

			if ( 'processedItems' in changed || 'unicodes' in changed ) {
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

function create_if_block_1$1 ( state, component ) {
	var tr, td;

	function get_block ( state ) {
		if ( state.isLoading ) return create_if_block_2$1;
		return create_if_block_3$1;
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
	component.doEditItem(event, item);
}

function click_handler_1 ( event ) {
	var component = this._svelte.component;
	var each_block_value = this._svelte.each_block_value, item_index = this._svelte.item_index, item = each_block_value[item_index];
	component.doEditItem(event, item);
}

function click_handler_2 ( event ) {
	var component = this._svelte.component;
	var each_block_value = this._svelte.each_block_value, item_index = this._svelte.item_index, item = each_block_value[item_index];
	component.fire("deleteItem", { id: item.id });
}

function Users ( options ) {
	options = options || {};
	this._state = assign( template$3.data(), options.data );
	recompute$1( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment$4( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
}

assign( Users.prototype, template$3.methods, proto );

Users.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute$1( this._state, newState, oldState, false );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Users.prototype.teardown = Users.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function create_main_fragment$2 ( state, component ) {
	var div, text;

	var filters = new Filters({
		_root: component._root,
		data: { filter: state.filter }
	});

	filters.on( 'filterData', function ( event ) {
		component.fire("filterData", event);
	});

	var users = new Users({
		_root: component._root,
		data: {
			isLoading: state.isLoading,
			items: state.items,
			sorting: state.sorting
		}
	});

	users.on( 'requestData', function ( event ) {
		component.fire("requestData", event);
	});

	users.on( 'deleteItem', function ( event ) {
		component.fire("deleteItem", event);
	});

	users.on( 'editItem', function ( event ) {
		component.fire("editItem", event);
	});

	users.on( 'cancelEdit', function ( event ) {
		component.fire("cancelEdit", event);
	});

	users.on( 'updateSorting', function ( event ) {
		component.fire("updateSorting", event);
	});

	return {
		create: function () {
			div = createElement( 'div' );
			filters._fragment.create();
			text = createText( "\n  " );
			users._fragment.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			div.className = "listUsers";
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			filters._fragment.mount( div, null );
			appendNode( text, div );
			users._fragment.mount( div, null );
		},

		update: function ( changed, state ) {
			var filters_changes = {};

			if ( 'filter' in changed ) filters_changes.filter = state.filter;

			if ( Object.keys( filters_changes ).length ) filters.set( filters_changes );

			var users_changes = {};

			if ( 'isLoading' in changed ) users_changes.isLoading = state.isLoading;
			if ( 'items' in changed ) users_changes.items = state.items;
			if ( 'sorting' in changed ) users_changes.sorting = state.sorting;

			if ( Object.keys( users_changes ).length ) users.set( users_changes );
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: function () {
			filters.destroy( false );
			users.destroy( false );
		}
	};
}

function ListUsers ( options ) {
	options = options || {};
	this._state = options.data || {};

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	if ( !options._root ) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment$2( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}

	if ( !options._root ) {
		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign( ListUsers.prototype, proto );

ListUsers.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

ListUsers.prototype.teardown = ListUsers.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module, exports) {
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;
});

var template$4 = (function () {

  return {
    data () {
      return {
        isLoading: false, // TODO What about passing this in>
        item: {},
        items: []
      }
    },
    oncreate () {

      // Some trickery so that if the items haven't been loaded yet, trigger that request and, once done, update the component's state.
      if (this.get('items').length === 0) {
        var self = this;
        this.set({ isLoading: true });

        let observer = null;
        observer = this.observe('items', () => {
          self.set({ isLoading: false });
          observer.cancel();
        }, { init: false });

        // FIXME Hack because main.js use of app.on() for requestData is bound after app is finished being created!
        setTimeout(() => {
          self.fire('requestData');
        }, 250);

      }
    },
    methods: {
      /**
       * TODO Best practice here? Two-way bindings for convenience?
       */
      saveUser: function (event) {
        event.preventDefault();

        // TODO validate a user item, return a payload the UI can use. Standardise.

        let item = this.get('item'); // original item

        let editItem = JSON.parse(JSON.stringify(this.get('item')));
        editItem.firstName = this.refs.firstName.value;
        editItem.lastName = this.refs.lastName.value;
        editItem.email = this.refs.email.value;

        // Check any fields were actually changed first.
        if (index(item, editItem)) {
          return
        }

        // Changed
        this.fire('saveUser', editItem);
      },
      /**
       * Interesting.. don't put routing knowledge into this component, just fire the semantic event and let the "app" take care of it.
       * Keeps routing within the app component, rather than scattered throughout the subcomponents?
       */
      cancelEdit: function (event) {
        event.preventDefault();
        this.fire('cancelEdit', event);
      }
    }
  }
}());

function create_main_fragment$5 ( state, component ) {
	var div;

	function get_block ( state ) {
		if ( state.isLoading ) return create_if_block$2;
		return create_if_block_1$2;
	}

	var current_block = get_block( state );
	var if_block = current_block( state, component );

	return {
		create: function () {
			div = createElement( 'div' );
			if_block.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-2471117103', '' );
			div.className = "editUser";
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			if_block.mount( div, null );
		},

		update: function ( changed, state ) {
			if ( current_block === ( current_block = get_block( state ) ) && if_block ) {
				if_block.update( changed, state );
			} else {
				if_block.unmount();
				if_block.destroy();
				if_block = current_block( state, component );
				if_block.create();
				if_block.mount( div, null );
			}
		},

		unmount: function () {
			detachNode( div );
			if_block.unmount();
		},

		destroy: function () {
			if_block.destroy();
		}
	};
}

function create_if_block$2 ( state, component ) {
	var text;

	return {
		create: function () {
			text = createText( "Loading data..." );
		},

		mount: function ( target, anchor ) {
			insertNode( text, target, anchor );
		},

		update: noop,

		unmount: function () {
			detachNode( text );
		},

		destroy: noop
	};
}

function create_if_block_1$2 ( state, component ) {
	var form, fieldset, legend, text, text_1_value, text_1, text_2, input, input_value_value, text_3, div, label, text_4, text_5, input_1, input_1_value_value, text_7, div_1, label_1, text_8, text_9, input_2, input_2_value_value, text_11, div_2, label_2, text_12, text_13, input_3, input_3_value_value, text_15, div_3, input_4, text_16, a, text_17;

	function submit_handler ( event ) {
		component.saveUser(event);
	}

	function click_handler ( event ) {
		component.cancelEdit(event);
	}

	return {
		create: function () {
			form = createElement( 'form' );
			fieldset = createElement( 'fieldset' );
			legend = createElement( 'legend' );
			text = createText( "Edit User #" );
			text_1 = createText( text_1_value = state.item.id );
			text_2 = createText( "\r\n        " );
			input = createElement( 'input' );
			text_3 = createText( "\r\n\r\n        " );
			div = createElement( 'div' );
			label = createElement( 'label' );
			text_4 = createText( "First name" );
			text_5 = createText( "\r\n          " );
			input_1 = createElement( 'input' );
			text_7 = createText( "\r\n\r\n        " );
			div_1 = createElement( 'div' );
			label_1 = createElement( 'label' );
			text_8 = createText( "Last name" );
			text_9 = createText( "\r\n          " );
			input_2 = createElement( 'input' );
			text_11 = createText( "\r\n\r\n        " );
			div_2 = createElement( 'div' );
			label_2 = createElement( 'label' );
			text_12 = createText( "Email" );
			text_13 = createText( "\r\n          " );
			input_3 = createElement( 'input' );
			text_15 = createText( "\r\n\r\n        " );
			div_3 = createElement( 'div' );
			input_4 = createElement( 'input' );
			text_16 = createText( " " );
			a = createElement( 'a' );
			text_17 = createText( "Cancel" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			addListener( form, 'submit', submit_handler );
			input.type = "hidden";
			input.name = "id";
			input.value = input_value_value = state.item.id;
			div.className = "row";
			label.htmlFor = "firstName";
			input_1.name = "firstName";
			input_1.type = "text";
			input_1.placeholder = "e.g. Bob";
			input_1.value = input_1_value_value = state.item.firstName;
			div_1.className = "row";
			label_1.htmlFor = "lastName";
			input_2.name = "lastName";
			input_2.type = "text";
			input_2.placeholder = "e.g. Connor";
			input_2.value = input_2_value_value = state.item.lastName;
			div_2.className = "row";
			label_2.htmlFor = "email";
			input_3.name = "email";
			input_3.type = "email";
			input_3.placeholder = "bob@connor.com";
			input_3.value = input_3_value_value = state.item.email;
			div_3.className = "row";
			input_4.type = "submit";
			input_4.name = "Submit";
			a.href = "#";
			addListener( a, 'click', click_handler );
		},

		mount: function ( target, anchor ) {
			insertNode( form, target, anchor );
			appendNode( fieldset, form );
			appendNode( legend, fieldset );
			appendNode( text, legend );
			appendNode( text_1, legend );
			appendNode( text_2, fieldset );
			appendNode( input, fieldset );
			appendNode( text_3, fieldset );
			appendNode( div, fieldset );
			appendNode( label, div );
			appendNode( text_4, label );
			appendNode( text_5, div );
			appendNode( input_1, div );
			component.refs.firstName = input_1;
			appendNode( text_7, fieldset );
			appendNode( div_1, fieldset );
			appendNode( label_1, div_1 );
			appendNode( text_8, label_1 );
			appendNode( text_9, div_1 );
			appendNode( input_2, div_1 );
			component.refs.lastName = input_2;
			appendNode( text_11, fieldset );
			appendNode( div_2, fieldset );
			appendNode( label_2, div_2 );
			appendNode( text_12, label_2 );
			appendNode( text_13, div_2 );
			appendNode( input_3, div_2 );
			component.refs.email = input_3;
			appendNode( text_15, fieldset );
			appendNode( div_3, fieldset );
			appendNode( input_4, div_3 );
			appendNode( text_16, div_3 );
			appendNode( a, div_3 );
			appendNode( text_17, a );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = state.item.id ) ) {
				text_1.data = text_1_value;
			}

			if ( input_value_value !== ( input_value_value = state.item.id ) ) {
				input.value = input_value_value;
			}

			if ( input_1_value_value !== ( input_1_value_value = state.item.firstName ) ) {
				input_1.value = input_1_value_value;
			}

			if ( input_2_value_value !== ( input_2_value_value = state.item.lastName ) ) {
				input_2.value = input_2_value_value;
			}

			if ( input_3_value_value !== ( input_3_value_value = state.item.email ) ) {
				input_3.value = input_3_value_value;
			}
		},

		unmount: function () {
			detachNode( form );
			if ( component.refs.firstName === input_1 ) component.refs.firstName = null;
			if ( component.refs.lastName === input_2 ) component.refs.lastName = null;
			if ( component.refs.email === input_3 ) component.refs.email = null;
		},

		destroy: function () {
			removeListener( form, 'submit', submit_handler );
			removeListener( a, 'click', click_handler );
		}
	};
}

function EditUser ( options ) {
	options = options || {};
	this.refs = {};
	this._state = assign( template$4.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	var oncreate = template$4.oncreate.bind( this );

	if ( !options._root ) {
		this._oncreate = [oncreate];
	} else {
	 	this._root._oncreate.push(oncreate);
	 }

	this._fragment = create_main_fragment$5( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}

	if ( !options._root ) {
		callAll(this._oncreate);
	}
}

assign( EditUser.prototype, template$4.methods, proto );

EditUser.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

EditUser.prototype.teardown = EditUser.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'routeParts' in newState && differs( state.routeParts, oldState.routeParts ) ) ) {
		state.route = newState.route = template.computed.route( state.routeParts );
	}

	if ( isInitial || ( 'items' in newState && differs( state.items, oldState.items ) ) || ( 'routeParts' in newState && differs( state.routeParts, oldState.routeParts ) ) ) {
		state.itemToEdit = newState.itemToEdit = template.computed.itemToEdit( state.items, state.routeParts );
	}
}

var template = (function () {
  const getRouteParts = (href) => {
    // Break up Foo/bar/blah/etc/1 into parts. Individual routes know how to read their own subroutes.
    return (href || location.hash.slice(1) || Config.routes.default).split('/')
  };

  return {
    // oncreate () {
    //   // this.set({ routeParts: getRouteParts() }) // Set initial view. (default data removes need for this.)
    //   console.log('SvelteDemoApp oncreate')
    // },
    data () {
      return {
        routeParts: getRouteParts(),
        routes: Config.routes,
        isLoading: false,
        count: 0,
        items: [],
        filter: '',
        sorting: {} // TODO Defining data structures at multiple levels...
      }
    },
    computed: {
      route: (routeParts) => {
        if (!routeParts) {
          return Config.routes.default // defensive?
        }
        return routeParts[0] // the zero-eth part is always the main "view" of the route.
      },
      itemToEdit: (items, routeParts) => {
        // routeParts should always be defined due to oncreate method already running?
        let foundItem = items.find(item => {
          return item.id.toString() === routeParts[1] // See editItem.
        });
        return foundItem || {}
      }
    },
    methods: {
        /**
         * Handles events triggered from a) dom nodes or b) semantic events fire'd components.
         */
        doRoute: function (event) {
          if (event.preventDefault) { event.preventDefault(); } // semantic events won't have dom events... why should this be here then?
          let href = event.target ? event.target.getAttribute('href').slice(1) : event.href; // remove hash from href attributes
          let routeParts = getRouteParts(href); // for semantic events
          window.history.pushState(routeParts, routeParts[0], ('#' + href)); // FIXME Adding the hash here...
          this.set({ routeParts: routeParts });
        },
        doPopState: function () {
          // TODO Repeated code from main.js.
          let routeParts = getRouteParts();
          this.set({ routeParts: routeParts });
        },
        editItem: function (event) {
          // TODO Could check for populated items array at this point?
          // So, this means that Users component knows nothing about route generation, it just fired up the id.
          this.doRoute({ href: Config.routes.editUser+'/'+event.id }); // FIXME weaksauce route url construction.
        },
        cancelEdit: function () {
          this.doRoute({ href: Config.routes.listUsers});
        },
        requestData: function () {
          // TODO isLoading... localise to Users component?
          this.set({ isLoading: true });
          this.fire('requestData');
        },
        setData: function (data) {
          data.isLoading = false;
          data.originalItems = data.items.slice(); // make a shallow copy for filtering etc.
          this.set(data);
        }
    }
  }
}());

function create_main_fragment ( state, component ) {
	var text, div, nav, a, a_href_value, text_1, text_2, a_1, a_1_href_value, text_3, text_4, a_2, a_2_href_value, text_5, text_7;

	function onwindowpopstate ( event ) {
		component.doPopState(event);
	}
	window.addEventListener( 'popstate', onwindowpopstate );

	function click_handler ( event ) {
		component.doRoute(event);
	}

	function click_handler_1 ( event ) {
		component.doRoute(event);
	}

	function click_handler_2 ( event ) {
		component.doRoute(event);
	}

	function get_block ( state ) {
		if ( state.route === state.routes.splash ) return create_if_block;
		if ( state.route === state.routes.listUsers ) return create_if_block_1;
		if ( state.route === state.routes.editUser ) return create_if_block_2;
		return create_if_block_3;
	}

	var current_block = get_block( state );
	var if_block = current_block( state, component );

	return {
		create: function () {
			text = createText( "\n\n" );
			div = createElement( 'div' );
			nav = createElement( 'nav' );
			a = createElement( 'a' );
			text_1 = createText( "Home" );
			text_2 = createText( "\n    " );
			a_1 = createElement( 'a' );
			text_3 = createText( "List Users" );
			text_4 = createText( "\n    " );
			a_2 = createElement( 'a' );
			text_5 = createText( "Test Broken" );
			text_7 = createText( "\n\n  " );
			if_block.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-3656195501', '' );
			div.className = "helloWorld";
			nav.className = "navLinks";
			a.href = a_href_value = "#" + ( state.routes.splash );
			addListener( a, 'click', click_handler );
			a_1.href = a_1_href_value = "#" + ( state.routes.listUsers );
			addListener( a_1, 'click', click_handler_1 );
			a_2.href = a_2_href_value = "#" + ( state.routes.testBroken );
			addListener( a_2, 'click', click_handler_2 );
		},

		mount: function ( target, anchor ) {
			insertNode( text, target, anchor );
			insertNode( div, target, anchor );
			appendNode( nav, div );
			appendNode( a, nav );
			appendNode( text_1, a );
			appendNode( text_2, nav );
			appendNode( a_1, nav );
			appendNode( text_3, a_1 );
			appendNode( text_4, nav );
			appendNode( a_2, nav );
			appendNode( text_5, a_2 );
			appendNode( text_7, div );
			if_block.mount( div, null );
		},

		update: function ( changed, state ) {
			if ( a_href_value !== ( a_href_value = "#" + ( state.routes.splash ) ) ) {
				a.href = a_href_value;
			}

			if ( a_1_href_value !== ( a_1_href_value = "#" + ( state.routes.listUsers ) ) ) {
				a_1.href = a_1_href_value;
			}

			if ( a_2_href_value !== ( a_2_href_value = "#" + ( state.routes.testBroken ) ) ) {
				a_2.href = a_2_href_value;
			}

			if ( current_block === ( current_block = get_block( state ) ) && if_block ) {
				if_block.update( changed, state );
			} else {
				if_block.unmount();
				if_block.destroy();
				if_block = current_block( state, component );
				if_block.create();
				if_block.mount( div, null );
			}
		},

		unmount: function () {
			detachNode( text );
			detachNode( div );
			if_block.unmount();
		},

		destroy: function () {
			window.removeEventListener( 'popstate', onwindowpopstate );

			removeListener( a, 'click', click_handler );
			removeListener( a_1, 'click', click_handler_1 );
			removeListener( a_2, 'click', click_handler_2 );
			if_block.destroy();
		}
	};
}

function create_if_block ( state, component ) {

	var splash = new Splash({
		_root: component._root,
		data: { name: state.name, count: state.count }
	});

	return {
		create: function () {
			splash._fragment.create();
		},

		mount: function ( target, anchor ) {
			splash._fragment.mount( target, anchor );
		},

		update: function ( changed, state ) {
			var splash_changes = {};

			if ( 'name' in changed ) splash_changes.name = state.name;
			if ( 'count' in changed ) splash_changes.count = state.count;

			if ( Object.keys( splash_changes ).length ) splash.set( splash_changes );
		},

		unmount: function () {
			splash._fragment.unmount();
		},

		destroy: function () {
			splash.destroy( false );
		}
	};
}

function create_if_block_1 ( state, component ) {

	var listusers = new ListUsers({
		_root: component._root,
		data: {
			isLoading: state.isLoading,
			items: state.items,
			sorting: state.sorting,
			filter: state.filter
		}
	});

	listusers.on( 'filterData', function ( event ) {
		component.fire("filterData", event);
	});

	listusers.on( 'requestData', function ( event ) {
		component.requestData();
	});

	listusers.on( 'editItem', function ( event ) {
		component.editItem(event);
	});

	listusers.on( 'deleteItem', function ( event ) {
		component.fire("deleteItem", event);
	});

	listusers.on( 'updateSorting', function ( event ) {
		component.fire("updateSorting", event);
	});

	return {
		create: function () {
			listusers._fragment.create();
		},

		mount: function ( target, anchor ) {
			listusers._fragment.mount( target, anchor );
		},

		update: function ( changed, state ) {
			var listusers_changes = {};

			if ( 'isLoading' in changed ) listusers_changes.isLoading = state.isLoading;
			if ( 'items' in changed ) listusers_changes.items = state.items;
			if ( 'sorting' in changed ) listusers_changes.sorting = state.sorting;
			if ( 'filter' in changed ) listusers_changes.filter = state.filter;

			if ( Object.keys( listusers_changes ).length ) listusers.set( listusers_changes );
		},

		unmount: function () {
			listusers._fragment.unmount();
		},

		destroy: function () {
			listusers.destroy( false );
		}
	};
}

function create_if_block_2 ( state, component ) {

	var edituser = new EditUser({
		_root: component._root,
		data: { items: state.items, item: state.itemToEdit }
	});

	edituser.on( 'requestData', function ( event ) {
		component.requestData();
	});

	edituser.on( 'cancelEdit', function ( event ) {
		component.cancelEdit(event);
	});

	edituser.on( 'saveUser', function ( event ) {
		component.fire("saveUser", event);
	});

	return {
		create: function () {
			edituser._fragment.create();
		},

		mount: function ( target, anchor ) {
			edituser._fragment.mount( target, anchor );
		},

		update: function ( changed, state ) {
			var edituser_changes = {};

			if ( 'items' in changed ) edituser_changes.items = state.items;
			if ( 'itemToEdit' in changed ) edituser_changes.item = state.itemToEdit;

			if ( Object.keys( edituser_changes ).length ) edituser.set( edituser_changes );
		},

		unmount: function () {
			edituser._fragment.unmount();
		},

		destroy: function () {
			edituser.destroy( false );
		}
	};
}

function create_if_block_3 ( state, component ) {
	var p, text, text_1_value, text_1, text_2;

	return {
		create: function () {
			p = createElement( 'p' );
			text = createText( "No route found for '" );
			text_1 = createText( text_1_value = state.route );
			text_2 = createText( "'" );
		},

		mount: function ( target, anchor ) {
			insertNode( p, target, anchor );
			appendNode( text, p );
			appendNode( text_1, p );
			appendNode( text_2, p );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = state.route ) ) {
				text_1.data = text_1_value;
			}
		},

		unmount: function () {
			detachNode( p );
		},

		destroy: noop
	};
}

function SvelteDemoApp ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );
	recompute( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	if ( !options._root ) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}

	if ( !options._root ) {
		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign( SvelteDemoApp.prototype, template.methods, proto );

SvelteDemoApp.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

SvelteDemoApp.prototype.teardown = SvelteDemoApp.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

// Kickstart the application.

const MIN_FILTER_LENGTH = 1; // allow for id searches

// Top-level component is the "app".
var app = new SvelteDemoApp({
    target: document.querySelector('main'),
    data: {
        name: 'Scott',
        count: parseInt(window.localStorage.count || 0, 10), // A bit of fun with localStorage.
        items: [],
        filter: '',
        sorting: {
            active: true,
            fieldName: 'id',
            order: 'asc'
        }
    }
});

// Listen for semantic events and talk to servers, modify data etc.

app.on('requestData', () => {
    fetch('data.json').then(function (response) {
        response.json().then(function (json) {
            app.setData(json);
        });
    });
});

app.on('deleteItem', event => {
    let items = app.get('items').filter(function (item) {
      return item.id !== event.id
    });
    app.set({ items: items });
});

app.on('filterData', event => {

    let originalItems = app.get('originalItems');
    let filterValue = event.filter && event.filter.toString().trim();

    // Not loaded yet.
    if (!originalItems) {
        return;
    }

    // If the filter is empty or blank, reset the filtering to the original items.
    if (filterValue === '' || filterValue.length < MIN_FILTER_LENGTH) {
        app.set({ items: originalItems });
        return
    }

    // Important: use originalItems, filter down, set into items.
    let items = originalItems.filter(function (item) {
        return Object.getOwnPropertyNames(item).some(function (fieldName) {
            // Handle numbers and strings the same way.
            if (-1 !== item[fieldName].toString().toLowerCase().indexOf(event.filter.trim().toLowerCase())) {
                return true
            }
            return false
        })
    });

    app.set({ items: items, filter: filterValue });
});

app.on('updateSorting', event => {

    let sorting = app.get('sorting');

    sorting.active = true; // ensure flag is on

    // Wipe the order if switching fields.
    if (sorting.fieldName !== event.fieldName) {
        sorting.order = null;
    }

    // Update which field is being sorted.
    sorting.fieldName = event.fieldName;

    // Default asc on first click.
    sorting.order = sorting.order === 'asc' ? 'desc' : 'asc';

    app.set({ sorting: sorting });
});

app.on('saveUser', event => {
    let items = app.get('items');
    let foundIdx = items.findIndex((item) => {
        return item.id === event.id
    });
    if (foundIdx === -1) {
        throw 'Failed to find item by id=' + event.id
    }
    items[foundIdx] = event; // new data
    app.set({ items: items });
});

}());
