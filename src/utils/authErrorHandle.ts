import  { AxiosError } from 'axios';

const handleApiResponseError = (error: AxiosError, context: 'login' | 'signup' ) => {
    if (error.response) {
        switch (error.response.status) {
            case 201:  
                if (context === 'signup') {
                    alert("Success, User created successfully.");
                }
                break;
            case 200:
                if (context === 'login') {
                    console.log("New access token generated.");
                }
                break;
            case 400:
                if (context === 'signup') {
                   alert("Signup Error, user already exists. Please try again.");
                } else {
                    alert("Authentication Error, User not found. Please check your details and try again.");
                }
                break;
            case 401:
                if (context === 'login') {
                  alert("Authentication Error, Invalid password. Please try again.");
                }
                break;
            case 500:
                alert("Server Error, Internal server error. Please try again later.");
                break;
            default:
                alert("Error, An unexpected error occurred. Please try again.");
                console.error("An unexpected error occurred:", error);
                break;
        }
    } else {
        alert("Network Error, An error occurred while trying to connect to the server. Please check your network connection and try again.");
    }
};


export default handleApiResponseError
