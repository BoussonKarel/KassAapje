import { baseUrl } from "../config/api";

const default_headers = (accessToken: string = null) => {
  const headers = new Headers();

  if (accessToken) {
    const bearer = `Bearer ${accessToken}`;
  
    headers.append('Authorization', bearer);
  }

  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  return headers;
};

export const restAPI = {
  post: async (
    endpoint: string,
    body: Object,
    token: string = null
  ): Promise<any> => {
    var requestBody = JSON.stringify(body);

    // return new Promise<any>(async (resolve, reject) => {
      const headers = default_headers(token);

      const options = {
        method: 'POST',
        headers: headers,
        body: requestBody,
      };

      return fetch(`${baseUrl}/${endpoint}`, options)
        .then(async (response) => {
          const body = await response.json();
          if (!response.ok) {
            if (body.error) throw Error(body.error);
            else throw Error(response.statusText);
          }
          return body;
        })
        .catch((error: any) => {
          throw error;
        })
    // })
  }
}