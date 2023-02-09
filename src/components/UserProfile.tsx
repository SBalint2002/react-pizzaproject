var UserProfile = (function () {
    var token = "";
    var id = 0;
    var last_name = "";
    var first_name = "";
    var email = "";
    var password = "";
    var admin = false;
  
    var getToken = function () {
      return token;
    };
  
    var setToken = function (tokenValue: string) {
      token = tokenValue;
    };
  
    var getId = function () {
      return id;
    };
  
    var setId = function (idValue: number) {
      id = idValue;
    };
  
    var getLastName = function () {
      return last_name;
    };
  
    var setLastName = function (last_nameValue: string) {
      last_name = last_nameValue;
    };
  
    var getFirstName = function () {
      return first_name;
    };
  
    var setFirstName = function (first_nameValue: string) {
      first_name = first_nameValue;
    };
  
    var getEmail = function () {
      return email;
    };
  
    var setEmail = function (emailValue: string) {
      email = emailValue;
    };
  
    var getPassword = function () {
      return password;
    };
  
    var setPassword = function (passwordValue: string) {
      password = passwordValue;
    };
  
    var isAdmin = function () {
      return admin;
    };
  
    var setAdmin = function (adminValue: boolean) {
      admin = adminValue;
    };
  
    return {
      getToken: getToken,
      setToken: setToken,
      getId: getId,
      setId: setId,
      getLastName: getLastName,
      setLastName: setLastName,
      getFirstName: getFirstName,
      setFirstName: setFirstName,
      getEmail: getEmail,
      setEmail: setEmail,
      getPassword: getPassword,
      setPassword: setPassword,
      isAdmin: isAdmin,
      setAdmin: setAdmin
    };
  })();
  
  export default UserProfile;
  
  
  
  /* import * as React from 'react';
  
  const UserProfileContext = React.createContext({});
  
  export const UserProfileProvider = (props: any) => {
    const [token, setToken] = React.useState('');
    const [id, setId] = React.useState(0);
    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
  
    return (
      <UserProfileContext.Provider
        value={{
          token,
          setToken,
          id,
          setId,
          lastName,
          setLastName,
          firstName,
          setFirstName,
          email,
          setEmail,
          password,
          setPassword,
          isAdmin,
          setIsAdmin,
        }}
      >
        {props.children}
      </UserProfileContext.Provider>
    );
  };
  
  export default UserProfileContext;
   */