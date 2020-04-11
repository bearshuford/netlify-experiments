import React, { useState } from 'react';

const AuthContext = React.createContext();

export { AuthContext };

export default ({children}) => {
  const [special, setSpecial] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  return <AuthContext.Provider value={{special, token, setSpecial, setToken, loading, setLoading}}>
      {children}
  </AuthContext.Provider>
}