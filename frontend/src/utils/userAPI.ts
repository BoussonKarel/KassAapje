const URI = 'http://localhost:8888'

const default_headers = () => {
    const headers = new Headers();
    return headers;
};

const API_post = async (endpoint: string, body: Object): Promise<any> => {
  var requestbody = JSON.stringify(body)

  return new Promise<any>(async (resolve, reject) => {
    const headers = {"Content-type": "application/json; charset=UTF-8"};
    const options = {
      method: 'POST',
      headers: headers,
      body: requestbody,
    }

    fetch(`${URI}/${endpoint}`, options)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
  })
}


export const userAPI = {
  post: {
    signup: async (body: any) => {
      return API_post('signup', body).then(data => {
        return data
      })
    },
  },
}
