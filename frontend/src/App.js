import React from 'react';
import Header from './component/layout/Header/Header.js';
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";

import ProductDetails from "./component/Product/ProductDetails";
// import Products from "./component/Product/Products";

function App() {

  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });

},[]);



// this code is not working
// <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/product/:id" component={ProductDetails} />
//         <Route exact path="/products" component={Products} />
// </Switch>



  return <Router>
                      <Header />

            
                        <Home />

                        {/* <ProductDetails props="61dde560605d72a59d91e0f8"/> */}

                        

                      <Footer />
         </Router>;
  
}

export default App;
