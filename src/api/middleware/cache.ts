// if (process.env.NODE_ENV !== 'development') {

//   client.get(url, (err, data) => {
//     if (err) throw err

//     if (data !== null) {
//       Helpers.resHandler(err, res, JSON.parse(data.toString()))
//     } else {
//       next()
//     }
//   })
// } else {
//   next()
// }