<?php

namespace Utill\MQ;

class exceptionMQ extends \Utill\MQ\abstractMQ {

    public function __construct() {
        
    }
    
    /**
     * rabbitMQ basic publish wrapper function
     * @return null
     */
    public function basicPublish() {
        if($this->message == null) return null;
        $this->setConnection();
        $this->channel = $this->connection->channel();
        
        $this->channel->queue_declare(
            $this->channelProperties['queue.name'],    #queue - Queue names may be up to 255 bytes of UTF-8 characters
            $this->channelProperties['passive'],       #passive - can use this to check whether an exchange exists without modifying the server state
            $this->channelProperties['durable'],       #durable, make sure that RabbitMQ will never lose our queue if a crash occurs - the queue will survive a broker restart
            $this->channelProperties['exclusive'],     #exclusive - used by only one connection and the queue will be deleted when that connection closes
            $this->channelProperties['auto_delete']    #auto delete - queue is deleted when last consumer unsubscribes
            );
            
        $this->channel->basic_publish(
            $this->message,     #message 
            '',                 #exchange
            $this->channelProperties['queue.name']     #routing key (queue)
            );
             
        $this->channel->close();
        $this->connection->close();
    }

}

