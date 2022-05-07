import axios from 'axios';
import isSSR from '../utils/isSSR';

export default({ req }) => {
  console.log(isSSR)
  const config = {}
  config.baseURL = isSSR ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local' :  '/' ;
  if(req?.headers){
    config.headers = req.headers
  }
  return axios.create(config)
}