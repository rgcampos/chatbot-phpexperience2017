<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conversation.php';

header("Content-Type: application/json; charset=utf-8");

$returnArr = array();
$returnArr['status'] = 'ok';

$action = htmlspecialchars(!empty($_REQUEST['action']) ? $_REQUEST['action'] : '');
switch ($action) {
    case 'enviarMensagem':
        $returnArr['dados'] = array();
        
        $context = !empty($_REQUEST['context']) ? $_REQUEST['context'] : array();
        $message = !empty($_REQUEST['message']) ? $_REQUEST['message'] : 'inicia conversa';
        
        $obj = new Conversation();
        $obj->setUsername('1q2w3e4r-1q2w-1q2w-1q2w-1q2w3e4r5t6y');
        $obj->setPassword('OiUyTrE56Yu7');
        $obj->setVersionDate('2017-02-03');
        $obj->setWorkspace('q1w2e3r4-1234-q1w2-1234-q1w2e3r4t5y6');
        $returnArr['dados'] = json_decode($obj->message($message, $context), true);
        
        break;
    case 'teste':
        $returnArr['dados'] = array();
                
        $obj = new Conversation();
        $obj->setUsername('1q2w3e4r-1q2w-1q2w-1q2w-1q2w3e4r5t6y');
        $obj->setPassword('OiUyTrE56Yu7');
        $obj->setVersionDate('2017-02-03');
        $obj->setWorkspace('q1w2e3r4-1234-q1w2-1234-q1w2e3r4t5y6');
        $returnArr['dados'] = json_decode($obj->message(), true);
        
        break;
    default:
        $returnArr['status'] = 'error';
        break;
}

echo json_encode($returnArr);

?>