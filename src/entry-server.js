import { createApp } from './app'
const isDev = process.env.NODE_ENV !== 'production'
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()
	const meta = app.$meta()
    const { url } = context
    const fullPath = router.resolve(url).route.fullPath
    context.meta = meta
    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
