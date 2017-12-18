<?php

    $to = 'harijs.veveris@gmail.com';
    $subject = "Testa epasts";

    $htmlContent = '
        <html>
        <head>
            <title>Sveicināti</title>
        </head>
        <body>
            <h1>Testējam html e-pastu!</h1>        
        </body>
        </html>';

    // Set content-type header for sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // Additional headers
    $headers .= 'From: Cocóra Coffee Roasters<info@cocoracoffee.es>' . "\r\n";
    //$headers .= 'Cc: welcome@example.com' . "\r\n";
    //$headers .= 'Bcc: welcome2@example.com' . "\r\n";

    // Send email
    if(mail($to,$subject,$htmlContent,$headers)):
        $successMsg = 'Email was sent successfully.';
    else:
        $errorMsg = 'Email sending fail.';
    endif;

?>