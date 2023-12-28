import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// TODO: Redirect routes and make them inaccessible based on auth
const initialAuthState = {
  user: null,
};
const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  if (localStorage.getItem('foneaiJwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('foneaiJwtToken'));
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('foneaiJwtToken');
    } else {
      initialAuthState.user = decodedToken;
    }
  }
  function login(userData) {
    localStorage.setItem('foneaiJwtToken', userData.token);
    const decodedToken = jwtDecode(userData.token);
    dispatch({
      type: 'LOGIN',
      payload: decodedToken,
    });
  }
  function logout() {
    localStorage.removeItem('foneaiJwtToken');
    localStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
    window.location.reload();
  }
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export const useAuth = () => React.useContext(AuthContext);

export { AuthContext, AuthProvider };
