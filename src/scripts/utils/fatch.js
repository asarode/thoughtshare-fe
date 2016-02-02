const postJSON = body => ({
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})

const fatch = {
  postJSON(body) {
    return {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  },
  checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
      return res
    }
    let error = new Error(resonse.statusText)
    error.res = res
    throw error
  },
  parseJSON(res) {
    return res.json()
  }
}

export default fatch
