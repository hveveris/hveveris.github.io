<?php

    if (isset($_POST['to']) && isset($_POST['from']) && isset($_POST['greeting']) && isset($_POST['img'])) {

        $to = $_POST['to'];
        $subject = "Ziemassvētku sveiciens!";
        $url = "https://squalio.com/christmas-greeting/?from=" . $_POST['from'] . "&greeting=" . $_POST['greeting'] . "&img=" . $_POST['img'];

        $htmlContent = '
            <html>
            <head>
                <title>Sveicināti</title>
            </head>
            <body>
                <h1><a href="' . $url . '">Testējam html e-pasta linku!</h1>        
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
        if(mail($to, $subject, $htmlContent, $headers)):
            $response = 'ok';
        else:
            $response = 'error';
        endif;

    } else {
        $response = 'error';
    }

    echo $response;

?>