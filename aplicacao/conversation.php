<?php

class Conversation {
    
    private $username = '';
    private $password = '';
    private $pathMessage = '';
    private $workspace = '';
    private $versionDate = '2017-02-03';
    private $serviceName = 'conversation';
    private $url = 'https://gateway.watsonplatform.net/conversation/api';
    
    function __construct() {
        
    }
    
    private function callAPI($method, $url, $data = '') {
        $curl = curl_init();
        
        switch ($method) {
            case 'POST':
                curl_setopt($curl, CURLOPT_POST, true);
                
                if (!empty($data))
                    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
                break;
            default:
                if ($data)
                    $url = sprintf('%s?%s', $url, http_build_query($data));
                break;
        }
        
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $this->username.':'.$this->password);
        
        curl_setopt($curl, CURLOPT_URL, $url);
        // curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Accept: application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        
        $result = curl_exec($curl);
        
        curl_close($curl);
        
        return $result;
    }
    
    public function message($input = 'inicia conversa', $context = array()) 
    {
        $data = array(
            'input' => array(
                'text' => $input
            ),
            'alternate_intent' => true,
            'context' => (object)$context
        );
        
        return $this->callAPI('POST', $this->url.'/v1/workspaces/'.$this->workspace.'/message?version='.$this->versionDate, $data);
    }
    
    public function setPathMessage($aux = '') {
        $this->pathMessage = $aux;
    }
    
    public function setVersionDate($aux = '') {
        $this->versionDate = $aux;
    }
    
    public function setServiceName($aux = '') {
        $this->serviceName = $aux;
    }
    
    public function setUrl($aux = '') {
        $this->url = $aux;
    }
    
    public function setUsername($aux = '') {
        $this->username = $aux;
    }
    
    public function setPassword($aux = '') {
        $this->password = $aux;
    }
    
    public function setWorkspace($aux = '') {
        $this->workspace = $aux;
    }
    
    public function getPathMessage() {
        return $this->pathMessage;
    }
    
    public function getVersionDate() {
        return $this->versionDate;
    }
    
    public function getServiceName() {
        return $this->serviceName;
    }
    
    public function getUrl() {
        return $this->url;
    }
    
    public function getUsername() {
        return $this->username;
    }
    
    public function getPassword() {
        return $this->password;
    }
    
    public function getWorkspace() {
        return $this->workspace;
    }
    
}


?>