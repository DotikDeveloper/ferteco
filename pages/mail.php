<?php

  $name    = (isset($_POST['name'])) ? $_POST['name'] : '';
  $email   = (isset($_POST['email'])) ? $_POST['email'] : '';
  $message = (isset($_POST['message'])) ? $_POST['message'] : '';

  header('Content-Type: application/json');
  if ($name === '') {
    $response =  json_encode(array(
      'message' => 'Name cannot be empty',
      'code' => 0
    ));
    die($response);
  }
  if ($email === '') {
    $response =  json_encode(array(
      'message' => 'Email cannot be empty',
      'code' => 0
    ));
    die($response);
  } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response =  json_encode(array(
      'message' => 'Email format invalid.',
      'code' => 0
    ));
    die($response);
  }
  if ($message === '') {
    $response =  json_encode(array(
      'message' => 'Message cannot be empty',
      'code' => 0
    ));
    die($response);
  }

  "From: $name \n Email: $email \n Message: $message";

  $content    =  "<table style='width: 100%;'>
                  <tr style='background-color: #f8f8f8;'>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>Запрос с сайта</b></td>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'>fertecom.site</td>
                  </tr>
                  <tr>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>Имя</b></td>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'>$name</td>
                  </tr>
                  <tr>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>Email</b></td>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'>$email</td>
                  </tr>
                  <tr>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'><b>Сообщение</b></td>
                      <td style='padding: 10px; border: #e2dddd 1px solid;'>$message</td>
                  </tr>
              </table>";

  $recipient  = "contact@dotdev.site, contact@fertecom.site";

  $mailheader = array(
    'From' => $email,
    'Content-Type' => 'text/html;charset=UTF-8',
  );
  mail($recipient, 'fertecom', $content, $mailheader) or die("Error!");
  $response =  json_encode(array(
    'message' => 'Email successfully sent!',
    'code' => 1
  ));
  die($response);

?>