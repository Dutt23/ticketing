import 'bootstrap/dist/css/bootstrap.css'

// When any page is rendered in next.js, it does not just render the component
// It wraps in it's own component called _.app.js
// Here we are making out own _app.js, to handle global css
export default ({ Component, pageProps}) =>{
  console.log("Component passed");
  console.log(Component)
  return <Component {...pageProps} />
}