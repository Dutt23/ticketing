import buildClient from '../api/build-client';

const Landing = ({
  currentUser 
}) => <h1>Landing Page {JSON.stringify(currentUser)}</h1>


// https://github.com/vercel/next.js/blob/deprecated-main/errors/circular-structure.md
Landing.getInitialProps = async (context) =>{
  const { data } = await buildClient(context).get('/api/users/currentUser');
  
  return data;
}

export default Landing;