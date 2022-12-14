import '../styles/globals.css';
import Layout from './Layout';
import StateReducer from './Context/Reducer';

function MyApp({ Component, pageProps }) {
  return(
    <StateReducer>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateReducer>
  )
}

export default MyApp;
