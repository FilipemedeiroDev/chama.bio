import Router from 'next/router';
import { getItem } from '../utils/cookies';

export default function withAuth(Page) {
  const Wrapper = (props) => <Page {...props} />
  const token = getItem('token');

  Wrapper.getInitialProps = (ctx) => {
  
    if(!token) {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: '/sign-in'
        })
        ctx.res.end();
      } else {
        Router.replace('sign-in')
      }
    }

    return { props: token }
  }

  return Wrapper
}