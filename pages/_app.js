//import 'bootstrap/dist/css/bootstrap.css';


import { useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect( () => {
import ("bootstrap/dist/js/bootstrap");
import ("bootstrap/dist/css/bootstrap.css");
import ('../styles/globals.css');
  }, []
  );
  return <>
 
  <Component {...pageProps} /></>
}

export default MyApp
