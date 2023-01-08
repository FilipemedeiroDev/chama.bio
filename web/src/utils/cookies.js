import Cookies from 'js-cookie';


export function setItem(key, value) {
  Cookies.set(key, value,{expires: 1, path: '/'});
}

export function getItem(key) {
  return Cookies.get(key);
}

export function removeItem(key) {
  Cookies.remove(key, {path: '/'});
}

