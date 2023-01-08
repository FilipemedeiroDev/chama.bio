import Router from 'next/router';

function isBrowser() {
  return !!window
}

function getCookies(ctx) {
  if (ctx.req) {
    return ctx.req.cookies ?? {}
  }

  if (isBrowser()) {
    return document.cookies
  }

  return {};
}

export default function withAuth(Page) {
  const Wrapper = (props) => <Page {...props} />

  Wrapper.getInitialProps = async (ctx) => {
   const { cookies } = ctx.req
    
    if(!cookies.token) {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: '/sign-in'
        })
        ctx.res.end();
      } else {
        Router.replace('/sign-in')
      }
    }

    return { props: cookies.token }
  }

  return Wrapper
}