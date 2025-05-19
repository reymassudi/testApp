'use server';

import { getToken } from '@/utils/auth';
import { apis, method } from '@/utils/constants/apis';

const default_headers = {
  'Content-Type': 'application/json',
};
const formData_headers = {};

export async function no_auth_fetch(
  path,
  method,
  body = null,
  extraOptions = null,
) {
  let options = {
    method,
    headers: default_headers,
  };

  if (body && method !== 'GET' && method !== 'HEAD') {
    options.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  if (extraOptions) {
    options = {
      ...options,
      ...extraOptions,
    };
  }

  // console.log('options', options);
  // console.log('body', method, options?.body);

  const response = await fetch(`${process.env.BASE_URL}${path}`, options);
  console.log('response api', path, response);

  if (response.status === 500) {
    return { response, data: null };
  }

  let data;
  try {
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const errorText = await response.text();
      console.log('Non-JSON Response:', errorText);
      data = null;
    }
  } catch (e) {
    data = null;
  }

  console.log('data', path, data);

  return { response, data };
}

export async function auth_fetch(
  path,
  method,
  body = null,
  tag,
  isFormData,
  token,
) {
  let auth_token;

  // get token from request header in server actions and from browser in client ones
  if (token && token !== 'undefined') {
    auth_token = token;
  } else {
    const { access_token } = await getToken();
    auth_token = access_token;
  }
  // console.log('auth_token', auth_token);

  const options = {
    headers: {
      ...(isFormData ? formData_headers : default_headers),
      Authorization: `Bearer ${auth_token}`,
    },
  };

  if (tag) {
    options.next = { tags: [tag] };
  }

  return await no_auth_fetch(path, method, body, options);
}

export async function get_refreshed_token(refresh_token) {
  const options = {
    headers: {
      ...default_headers,
      Authorization: `Bearer ${refresh_token}`,
    },
  };

  return await no_auth_fetch(apis.refresh_token, method.get, null, options);
}
