import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { IUserLogin } from '../interface/IUserLogin'

export const useCookie = () => {

  function createTokenCookie(cookieValue: IUserLogin) {

    setCookie(null, "token", cookieValue.token!, {
      maxAge: 1800, //30 minutos de acesso
      path: '/',
    })
    setCookie(null, "login", cookieValue.login!, {
      maxAge: 1800, //30 minutos de acesso
      path: '/',
    })
  }

  function getAuthCookie() {
    const cookies = parseCookies()

    return { token: cookies.token, login: cookies.login }
  }

  function destroy() {
    destroyCookie(null, `token`)
    destroyCookie(null, `login`)
  }

  return { createTokenCookie, getAuthCookie, destroy }
}