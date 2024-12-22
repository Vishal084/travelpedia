// import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar'
// // import LoadingSpinner from './components/common/LoadingSpinner';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import { TripProvider } from './context/TripContext';

// // Lazy load pages
// const Home = React.lazy(() => import('../src/pages/Home/Home'));
// const Dashboard = React.lazy(() => import('../src/pages/UserDashboard/UserDashboard'));
// // const Cart = React.lazy(() => import('../src/pages/Cart/Cart'));
// // const Checkout = React.lazy(() => import('../src/pages/Checkout/Checkout'));
// const TripDetails = React.lazy(() => import('../src/pages/TripDetailsPage/TripDetailsPage'));
// const Login = React.lazy(() => import('../src/pages/LoginPage/LoginPage'));
// const SignUp = React.lazy(() => import('../src/pages/SignUpPage/SignUpPage'));

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <TripProvider>
//             <div className="app">
//               <Navbar />
//               <Suspense fallback={<div>Loading...</div>}>
//                 <Routes>
//                   {/* Render Home component */}
//                   <Route path="/" element={<Home />} />
                  
//                   {/* Uncomment the following lines one by one to add other components */}
                  
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   {/* <Route path="/cart" element={<Cart />} /> */}
//                   {/* <Route path="/checkout" element={<Checkout />} /> */}
//                   <Route path="/trip/:id" element={<TripDetails />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<SignUp />} />
//                 </Routes>
//               </Suspense>
//             </div>
//           </TripProvider>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Footer from './components/Footer/Footer';


import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { TripProvider } from './context/TripContext';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home/Home'));
const Dashboard = React.lazy(() => import('./pages/UserDashboard/UserDashboard'));
const TripDetails = React.lazy(() => import('./pages/TripDetails/TripDetails'));
const Login = React.lazy(() => import('./pages/LoginPage/LoginPage'));
const SignUp = React.lazy(() => import('./pages/SignUpPage/SignUpPage'));
const Landing = React.lazy(() => import('./pages/LandingPage/LandingPage'));
const TripsPage = React.lazy(() => import('./pages/TripsPage/TripsPage'));
const Cart= React.lazy(()=>import('./pages/Cart/Cart'))
const PaymentPage = React.lazy(() => import('./pages/PaymentPage/PaymentPage'));


function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Fetch the data from the public/db.json file
    fetch('/db.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        return response.json();
      })
      .then((data) => setTrips(data.trips))
      .catch((error) => console.error('Error fetching trips:', error));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <TripProvider>
            <div className="app">
              <Navbar />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/trips" element={<TripsPage />} />
                  <Route path="/cart" element={<Cart/>} />
                  <Route path="/checkout" element={<PaymentPage />} />




                  <Route path="/trip/:id" element={<TripDetails />} />


                 
                 
                </Routes>
              </Suspense>
              
              <Footer />
            </div>
          </TripProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
