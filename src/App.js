import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState,useMemo, useEffect } from 'react';
import { CartContext, HeaderFooterContext, UserContext } from './contexts';
import { BottomSection, FloatingComponent, Footer, Header } from './components';
import { About, Auth, Blogs, BusesPage, Contact, FAQ, Home, PayMent, Profile, Search, SelectSeat } from './pages';


const App = ()=>{
  const [cartData,setCartData] = useState([]);
  const cartDataProvider = useMemo(()=>[cartData,setCartData],[cartData,setCartData]);

  const [userData,setUserData] = useState({loggedIn:false,data:{}});
  const userDataProvider = useMemo(()=>[userData,setUserData],[userData,setUserData]);

  const [headerFooter,setHeaderFooter] = useState({loggedIn:false,data:{}});
  const headerFooterProvider = useMemo(()=>[headerFooter,setHeaderFooter],[headerFooter,setHeaderFooter]);

  useEffect(()=>{
    //localStorage.removeItem("cartData");
    const cartInfo = localStorage.getItem("seatsData");
    if(cartInfo !== null){
      setCartData(JSON.parse(cartInfo));
    }

    const userInfo = window.localStorage.getItem("app_user");
    if(userInfo !== null){
      setUserData(JSON.parse(userInfo));
    }
  },[]);

  return (
    <div style={{
      backgroundColor:"#ffffff",
      position:"relative",
    }} >
      
      <CartContext.Provider value={cartDataProvider}>
        <UserContext.Provider value={userDataProvider}>
          <HeaderFooterContext.Provider value={headerFooterProvider} >
          <Router>
            <Header/>
            <Routes>
              <Route exact path={"/"} element={<Home/>} />
              <Route exact path={"/about"} element={<About/>} />
              <Route exact path={"/faqs"} element={<FAQ/>} />
              <Route exact path={"/tickets"} element={<Search/>} />
              <Route exact path={"/blogs"} element={<Blogs/>} />
              <Route exact path={"/contact"} element={<Contact/>} />
              <Route exact path={"/search/:pickupPoint/:destinationPoint/:date"} element={<Search/>} />
              <Route exact path={"/select-seat/:slug/:pickupPoint/:destinationPoint/:date"} element={<SelectSeat/>} />
              <Route exact path={"/payment-gateway"} element={<PayMent.SelectPayment/>} />
              <Route exact path={"/pay/:paymentType"} element={<PayMent.Pay/>} />
              <Route exact path={"/create-bus"} element={<BusesPage.CreateBus/>} />
              <Route exact path={"/profile"} element={<Profile.Profile/>} />
              <Route exact path={"/login"} element={<Auth.LoginPage/>} />
              <Route exact path={"/register"} element={<Auth.RegisterPage/>} />
              <Route exact path={"/forgot-password"} element={<Auth.ForgotPassword/>} />
            </Routes>
            <BottomSection.BottomTabs/>
          </Router>
          <FloatingComponent/>
          <Footer/>
          </HeaderFooterContext.Provider>
        </UserContext.Provider>
      </CartContext.Provider>
      
    </div>
  )
}


export default App;