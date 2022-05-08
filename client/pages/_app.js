import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client';

// When any page is rendered in next.js, it does not just render the component
// It wraps in it's own component called _.app.js
// Here we are making out own _app.js, to handle global css
const AppComponent = ({ Component, pageProps, currentUser}) =>{
  console.log("Component passed");
  console.log(Component)
  return (
    <div>
      <h1>Header ! {currentUser.email}</h1>
      <Component {...pageProps} currentUser={currentUser} />
    </div>
  )
}

// https://github.com/vercel/next.js/blob/deprecated-main/errors/circular-structure.md
AppComponent.getInitialProps = async (context) =>{
  const { data } = await buildClient(context.ctx).get('/api/users/currentUser');
  let pageProps = {};
  if(context?.Component?.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx);
  }
  return {
    pageProps,
    currentUser: data.currentUser 
  };
}

export default AppComponent;

