import buildClient from '../api/build-client';

const Landing = ({
  currentUser 
}) => {
  const content = currentUser ? 'You are signed in' : 'You are signed out'
  return <h1>{content}</h1>
}

export default Landing;