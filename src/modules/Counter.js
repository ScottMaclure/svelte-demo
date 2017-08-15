export function init(app) {

  app.on('incrementCount', (event) => {
      window.localStorage.count = parseInt(event.count, 10) + 1
      app.set({ count: window.localStorage.count })
  })

  app.on('resetCount', () => {
      window.localStorage.count = 0;
      app.set({ count: 0 })
  })

}