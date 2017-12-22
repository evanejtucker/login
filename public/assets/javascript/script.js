$( document ).ready(function() {

// global variables
// -----------------------------------------------------------------------------------------------------

    // materialize functions:
    $('.modal').modal();



// Functions
// -----------------------------------------------------------------------------------------------------

    // grab user info from modal
    var addUser = () => {
        let userObject = {
            firstname : $('#first_name').val().trim(),
            lastname : $('#last_name').val().trim(),
            username : $('#newUsername').val().trim(),
            password : $('#confirmPassword').val().trim(),
            email : $('#email').val().trim()
        }

        $.ajax({
            type: "POST",
            url: '/submit',
            dataType: "json",
            data: userObject
          }).then((response)=> {
              console.log(response);
          });
    }


// Main Process
// -----------------------------------------------------------------------------------------------------

$('#createNewUser').on('click', addUser);

});