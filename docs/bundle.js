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
			setAttribute( div, 'svelte-2485077542', '' );
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
	var tr, td, text_value, text, text_1, td_1, text_2_value, text_2, text_3, td_2, text_4_value, text_4, text_5, td_3, text_6_value, text_6, text_7, td_4, i, text_8_value, text_8, text_9, i_1, text_10_value, text_10;

	return {
		create: function () {
			tr = createElement( 'tr' );
			td = createElement( 'td' );
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
			i.className = "noselect";
			addListener( i, 'click', click_handler );

			i._svelte = {
				component: component,
				each_block_value: each_block_value,
				item_index: item_index
			};

			i_1.className = "noselect";
			addListener( i_1, 'click', click_handler_1 );

			i_1._svelte = {
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
			appendNode( i, td_4 );
			appendNode( text_8, i );
			appendNode( text_9, td_4 );
			appendNode( i_1, td_4 );
			appendNode( text_10, i_1 );
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
			removeListener( i, 'click', click_handler );
			removeListener( i_1, 'click', click_handler_1 );
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

	function click_handler_2 ( event ) {
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
			addListener( button, 'click', click_handler_2 );
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
			removeListener( button, 'click', click_handler_2 );
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
	component.fire("editItem", { id: item.id });
}

function click_handler_1 ( event ) {
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

var template$4 = (function () {
  return {
    data () {
      return {
        id: null,
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  }
}());

function create_main_fragment$5 ( state, component ) {
	var div, text, text_1_value, text_1, text_2, text_3_value, text_3, text_4, text_5_value, text_5, text_6, text_7_value, text_7;

	return {
		create: function () {
			div = createElement( 'div' );
			text = createText( "TODO Edit user " );
			text_1 = createText( text_1_value = state.item.id );
			text_2 = createText( " " );
			text_3 = createText( text_3_value = state.item.firstName );
			text_4 = createText( " " );
			text_5 = createText( text_5_value = state.item.lastName );
			text_6 = createText( " " );
			text_7 = createText( text_7_value = state.item.email );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			div.className = "editUser";
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( text, div );
			appendNode( text_1, div );
			appendNode( text_2, div );
			appendNode( text_3, div );
			appendNode( text_4, div );
			appendNode( text_5, div );
			appendNode( text_6, div );
			appendNode( text_7, div );
		},

		update: function ( changed, state ) {
			if ( text_1_value !== ( text_1_value = state.item.id ) ) {
				text_1.data = text_1_value;
			}

			if ( text_3_value !== ( text_3_value = state.item.firstName ) ) {
				text_3.data = text_3_value;
			}

			if ( text_5_value !== ( text_5_value = state.item.lastName ) ) {
				text_5.data = text_5_value;
			}

			if ( text_7_value !== ( text_7_value = state.item.email ) ) {
				text_7.data = text_7_value;
			}
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: noop
	};
}

function EditUser ( options ) {
	options = options || {};
	this._state = assign( template$4.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment$5( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
}

assign( EditUser.prototype, proto );

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
    //   this.set({ routeParts: getRouteParts() }) // Set initial view.
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
          let href = event.target ? event.target.getAttribute('href') : event.href; // remove hash from href attributes
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
          // So, this means that Users component knows nothing about route generation, it just fired up the id.
          this.doRoute({ href: Config.routes.editUser+'/'+event.id }); // FIXME weaksauce route url construction.
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
		component.doRoute();
	}

	function click_handler_1 ( event ) {
		component.doRoute();
	}

	function click_handler_2 ( event ) {
		component.doRoute();
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
			setAttribute( div, 'svelte-2579825537', '' );
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
		data: { item: state.itemToEdit }
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

// Listen for semantic event and fetch data from server. Can take event.
app.on('requestData', () =>
{
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

}());
