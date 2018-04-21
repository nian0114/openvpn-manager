<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
$parsedLog = '';
if (isset($_GET['key'])) {
    $key = $_GET['key'];
    if (strcmp($key, 'LbT6pbaJtKuxCsUUev8q7') != 0) {
        $status = array('status' => 'failed');
        $parsedLog = $status;
    } else {
        include_once 'parser.php';
        $parsedLog = parseLog('/etc/openvpn/openvpn-status.log');
        if ($parsedLog == null) {
            $status = array('status' => 'failed');
            $parsedLog = $status;
        } else {
            $status = array('status' => 'success');
            $parsedLog = $status + $parsedLog;
        }
    }
} else {
    $status = array('status' => 'failed');
    $parsedLog = $status;
}
echo json_encode($parsedLog);
