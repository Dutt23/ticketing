import axios from 'axios'
import isSSR  from '../utils/isSSR';
const Landing = ({
  currentUser 
}) => <h1>Landing Page {JSON.stringify(currentUser)}</h1>


// https://github.com/vercel/next.js/blob/deprecated-main/errors/circular-structure.md
Landing.getInitialProps = async ({ req }) =>{
  if(isSSR){
    console.log("on server side");
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser',{
      headers: req.headers
    }).catch((err) => {
      console.log(err.message)
    });
    console.log(data)
    return data;
  }
  else {
    console.log("On client side")
    const { data } = await axios.get('api/users/currentUser').catch((err) => {
      console.log(err.message)
    });
    return data;
  }
}

export default Landing;