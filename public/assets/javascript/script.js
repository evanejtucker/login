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
            username : $('#newUsername').val().trim(),
            password : $('#newPassword').val().trim()
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