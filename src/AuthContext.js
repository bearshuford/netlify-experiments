import React, { useState } from 'react';

const AuthContext = React.createContext();

export { AuthContext };

export default ({children}) => {
  const [auth, setAuth] = useState('');

  return <AuthContext.Provider value={{auth, setAuth}}>
      {children}
  </AuthContext.Provider>
}