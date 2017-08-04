import Config from './Config.js'

/**
 * Handles events triggered from a) dom nodes or b) semantic events fire'd components.
 */
const getRouteParts = (href) => {
  // Break up Foo/bar/blah/etc/1 into parts. Individual routes know how to read their own subroutes.
  return (href || location.hash.slice(1) || Config.routes.default).split('/')
}

const getMainRoute = (routeParts) => {
  if (!routeParts) {
    return Config.routes.default // defensive?
  }
  return routeParts[0] // the zero-eth part is always the main "view" of the route.
}

const doRoute = (event) => {
  if (event.preventDefault) { event.preventDefault() } // semantic events won't have dom events... why should this be here then?
  let href = event.target ? event.target.getAttribute('href').slice(1) : event.href // remove hash from href attributes
  let routeParts = getRouteParts(href) // for semantic events
  window.history.pushState(routeParts, routeParts[0], ('#' + href)) // FIXME Adding the hash here...
  return routeParts
}

const doPopState = () => {
  return getRouteParts()
}

export default {
  getRouteParts: getRouteParts,
  getMainRoute: getMainRoute,
  doRoute: doRoute,
  doPopState: doPopState
}