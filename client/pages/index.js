const Landing = ({
  color 
}) => <h1>Landing Page {color}</h1>


Landing.getInitialProps = () =>{
  console.log("on server side")
  return {
    color: 'red'
  }
}

export default Landing;