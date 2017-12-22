$( document ).ready(function() {

// global variables
// -----------------------------------------------------------------------------------------------------

    // materialize functions:
    $('.modal').modal();



// Functions
// -----------------------------------------------------------------------------------------------------

    // grab user info from modal
    var addUser = () => {
        let firstName = $('#first_name').val().trim();
        let lastName = $('#last_name').val().trim();
        let userName = $('#newUsername').val().trim();
        let password = $('#confirmPassword').val().trim();
        let email = $('#email').val().trim();

        console.log(firstName + " " + lastName + " " + userName + " " + password + " " + email);
    }


// Main Process
// -----------------------------------------------------------------------------------------------------

$('#createNewUser').on('click', addUser);

});