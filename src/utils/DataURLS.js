export let BASEURL = "https://tms-2k4s.onrender.com";
BASEURL = "http://127.0.0.1:8085";

let APPURL = "http://127.0.0.1:3000";
let debug=false;
if(!debug){
    APPURL = "https://tms.vividinnovations.co.ke";
}

export const DataURLS = {
    userSignUp:`${BASEURL}/api/auth-user/signup`,
    userSignIn:`${BASEURL}/api/auth-user/signin`,
    userForgotPassword:`${BASEURL}/api/api-user/forgot-password`,
    userResetPassword:`${BASEURL}/api/api-user/reset-password`,
    buses:`${BASEURL}/api/bus`,
    allBusesAvailable:`${BASEURL}/api/all-bus-available`,
    search:`${BASEURL}/api/search`,
    filter:`${BASEURL}/api/bus/filter`,
    locations:`${BASEURL}/api/locations`,
    travels:`${BASEURL}/api/travels`,

    ownerSignUp:`${BASEURL}/api/auth-owner/signup`,
    ownerSignIn:`${BASEURL}/api/auth-owner/signin`,

    userBookings:`${BASEURL}/api/bookings/my`,
    editBooking:`${BASEURL}/api/bookings/`,
    deleteBooking:`${BASEURL}/api/bookings/`,

    
} 

export {
    APPURL
}