// // src/context/AuthContext.js
// import { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);
// import React from 'react';
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for stored auth token on mount
//     const token = localStorage.getItem('authToken');
//     const userInfo = localStorage.getItem('userInfo');
//     if (token && userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       // Call your authentication API here
//       const response = await fetch('your-api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('userInfo', JSON.stringify(data.user));
//       setUser(data.user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await fetch('your-api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error('Signup failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('userInfo', JSON.stringify(data.user));
//       setUser(data.user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userInfo');
//     setUser(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export default AuthContext;



// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const userInfo = localStorage.getItem('userInfo');
//     if (token && userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Invalid email or password');
//       }

//       const data = await response.json();
//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('userInfo', JSON.stringify(data.user));
//       setUser(data.user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error('Signup failed');
//       }

//       const data = await response.json();
//       localStorage.setItem('authToken', data.token);
//       localStorage.setItem('userInfo', JSON.stringify(data.user));
//       setUser(data.user);
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userInfo');
//     setUser(null);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
