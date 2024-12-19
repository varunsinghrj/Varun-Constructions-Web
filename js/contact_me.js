$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Additional error messages or events can be added here if needed in the future
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // Prevent default submit behavior

            // Get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success Message

            // Check for white space in name for Success message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            // AJAX request to Web3Forms
            $.ajax({
                url: "https://api.web3forms.com/submit",
                type: "POST",
                data: {
                    access_key: "94366f0d-c60e-45a4-8882-15a19712dda4",
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append("<strong>Your message has been sent!</strong>")
                        .append('</div>');

                    // Show alert on screen
                    alert("Message sent! Thank you for contacting us, " + firstName + ".");

                    // Clear all fields
                    $('#contactForm').trigger("reset");

                    // Show thanks alert
                    alert("Thanks for filling out the form!");

                    // Redirect to index.html
                    window.location.href = "index.html";
                }
            });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/* When clicking on Full hide success box */
$('#name').focus(function() {
    $('#success').html('');
});
