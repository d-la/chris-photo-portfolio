'use strict';

$(document).ready( () => {
    const contactForm = $('form.form');
    const contactFormSubmitButton = $('button.button--normal');
    
    $(contactForm).submit( (e) => {
        e.preventDefault();

        const contactFormData = {
            firstName:   $('input[name="firstName"]').val(),
            lastName:    $('input[name="lastName"]').val(),
            email:       $('input[name="email"]').val(),
            phoneNumber: $('input[name="phoneNumber"]').val(),
            message:     $('textarea[name="message"]').val()
        };

        $.ajax({
            url: '/contact',
            method: 'POST',
            data: contactFormData
        }).done( (response, status) => {
            // If the submission succeeded, change the button to show the user the message went through
            $(contactFormSubmitButton).removeClass('button--normal').addClass('button--success').text('Message sent!');
        }).fail( (response) => {
            // If the submission failed, change the button to show the user the message failed
            $(contactFormSubmitButton).removeClass('button--normal').addClass('button--fail').text('Unable to send message!');
        });

        // Reset the form after 5 seconds
        setTimeout(resetForm, 5000);
    });

    // Function to reset the form
    const resetForm = () => {
        $('input[name="firstName"]').val('');
        $('input[name="lastName"]').val('');
        $('input[name="email"]').val('');
        $('input[name="phoneNumber"]').val('');
        $('textarea[name="message"]').val('');

        if ($(contactFormSubmitButton).hasClass('button--success')){
            $(contactFormSubmitButton).removeClass('button--success');
        } else if ($(contactFormSubmitButton).hasClass('button--faile')){
            $(contactFormSubmitButton).removeClass('button--fail');
        }

        $(contactFormSubmitButton).addClass('button--normal').text('Submit');
    };
});