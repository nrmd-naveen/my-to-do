
export const setRegIdToken = (id) =>{
    //Setting Register ID token in Local Storage
    localStorage.setItem('idToken',id.idToken);
}
export const setLoginIdToken = (id) =>{
    //Setting Login ID token in Local Storage
    localStorage.setItem('idToken',id);
}

export const getIdToken = () =>{
      //Getting ID token from Local Storage
    return localStorage.getItem('idToken')?localStorage.getItem('idToken'):null;
}