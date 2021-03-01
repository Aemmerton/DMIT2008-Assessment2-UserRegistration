/* 
  Register Service Will check to see if the user has inputted a valid email, password and username
  and add those to the users.json file upon validation and redirect the user to the login page.

  If they have not, the user will be presented with meaningful errors and will stay on the registration page.
*/
const fileService = require('./fileService')
const { v4: uuidv4 } = require("uuid");


exports.authenticate = (credential)=>{
 
   const {username, email, password} = {...credential}
   const authObj = {
       validUsername: false,
       validEmail: false,
       validPassword: false,
       isValid: false,
   };




   // use validation functions to check if username, email and pass entered are valid
   // if they are, add the user the the users.json file, if not display errors

    if (validateUsername(username)) {
        authObj.validUsername = true;
    }

    if (validateEmail(email)) {
        authObj.validEmail = true;
    }

    if (validatePassword(password)){
        authObj.validPassword = true;
    }

    if (authObj.validUsername === true && authObj.validEmail === true && authObj.validPassword === true){
        // add unique id to user obj
        credential.Id = uuidv4();

        // add user object to users.json
        addUser(credential)
        authObj.isValid = true
    }
   const auth0 = authObj.isValid ? {isValid: true}: formatErrors(authObj);
   return auth0
}

// create a function using regular expression to check for whitespace
function hasWhiteSpace(s) 
{
    var reWhiteSpace = new RegExp("/^\s+$/");

    // Check for white space
    if (reWhiteSpace.test(s)) {
        //alert("Please Check Your Fields For Spaces");
        return true;
    }

    return false;
}

// function used to add user objects to the user.json file in the data folder
    function addUser(user){
        fileService.writeFileContents('../data/users.json', user)
    }


// the functions below are for checking that the user form data is valid when registering a user

    function validateUsername(username){
        if (username.length < 25 && username.length >= 4 && !hasWhiteSpace(username)){
        return true;  
    } else{
        return false;
        }
    }
    function validateEmail(email){
        var testEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(testEmail) && !hasWhiteSpace(email))
        {
          return (true)
        } else {
          return (false)
        }
    }
    function validatePassword(password){
        var pass = /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if(password.match(pass) && !hasWhiteSpace(password)) {
            return true
        } else {
            return false
        }
    }

// this section is used the format errors and produce meaningful error messages if input fields do not meet validation vriteria.
const formatErrors = function(user){
  let passwordWarning = ""
  let emailWarning = ""
  let usernameWarning = ""

  if(user.validUsername === false){usernameWarning= `username is minimum 4 characters and cannot contain white space or be longer than 25 character`}
  if(user.validPassword === false){passwordWarning= `password must be minimum 8 characters with upper and lower case letters.`}
  if(user.validEmail === false){ emailWarning= `email must be valid email. ex = example@email.com`}

  return { isValid: false, usernameWarning, emailWarning, passwordWarning}
}
