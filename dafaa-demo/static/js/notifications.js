function get_userFriendlyMessage(error) {
    let userFriendlyMessage = "";

    // Check for common error types or HTTP status codes
    console.log('ss', error)
    if (error.response) {
        switch (error.response.status) {
            case 400:
                userFriendlyMessage = "There was an issue with your request. Please check your input.";
                break;
            case 401:
                userFriendlyMessage = "You are not authorized to perform this action. Please log in.";
                break;
            case 404:
                userFriendlyMessage = "The requested resource was not found.";
                break;
            case 500:
                userFriendlyMessage = "There was a server error. Please try again later.";
                break;
            default:
                userFriendlyMessage = "An unknown error occurred. Please try again.";
        }
    } else if (error.request) {
        // The request was made but no response was received
        userFriendlyMessage = "No response from the server. Please check your internet connection.";
    } else if (error.message === "Failed to fetch") {
        // Specific handling for 'Failed to fetch' error
        userFriendlyMessage = "Something went wrong: Please check your internet connection or try again later.";
    } else {
        // Something else caused an error
        userFriendlyMessage = "Something went wrong: " + error.message;
    }
    return userFriendlyMessage;
}