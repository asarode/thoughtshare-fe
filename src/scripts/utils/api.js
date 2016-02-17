let endpoint
if (process.env.NODE_ENV === 'production') {
  endpoint = 'http://alpha.grokstuff.com:4000'
} else {
  endpoint = 'http://localhost:4000'
}

export default {
  endpoint
}
