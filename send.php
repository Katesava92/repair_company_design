<?php
$userName = $_POST ['userName'];
$userPhone = $_POST ['userPhone'];
$userEmail = $_POST ['userEmail'];
$userQuestion = $_POST ['userQuestion'];

// Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                           // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';  // Set the SMTP server to send through
    $mail->SMTPAuth   = true;             // Enable SMTP authentication
    $mail->Username   = 'annkhmel21@gmail.com';         // SMTP username
    $mail->Password   = 'Ann303030';                    // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;               // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->CharSet = 'UTF-8';
    //Recipients
    $mail->setFrom('annkhmel21@gmail.com', 'Анна');
    $mail->addAddress('katesava92@yandex.by');     // Add a recipient

    // Content
    $mail->isHTML(true);                            // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = "Имя пользователя: ${userName}, Телефон: ${userPhone}, Email: ${userEmail}, Вопрос: ${userQuestion}" ;

    if ($mail->send()) {
        echo ok;
    } else {
        echo "Письмо не отправлено. Код ошибки: {$mail->ErrorInfo}";
    }
    
} catch (Exception $e) {
    echo "Письмо не отправлено. Код ошибки: {$mail->ErrorInfo}";
}