import { getUserDetailsApi } from "./api";
//import { getIdToken } from "./localStorage";


// export const isAuthenticated = () =>{
//     let id = getIdToken();
//     return (id == null || undefined ) ?false:true;
// }

// export const isAuthenticated = () =>{
//     let Auth = false;
//     getUserDetailsApi().then((response)=>{
//         console.log("Get User Details Response --- ", response);
//         Auth = true;
//     }).catch((er) =>{
//         console.log("Error in Getting User Details --- ", er);
//         Auth = false;
//     })
//     console.log("Authentication -- ",Auth);
//     return Auth;
// }
    
    // let id = getIdToken();
    // return (id == null || undefined ) ?false:true;

    export const isAuthenticated = () => {
    return new Promise((resolve, reject) => {
        getUserDetailsApi()
            .then(response => {
                console.log("Get User Details Response --- ", response);
                resolve(true);
            })
            .catch(error => {
                console.log("Error in Getting User Details --- ", error);
                resolve(false);
            });
    });
};