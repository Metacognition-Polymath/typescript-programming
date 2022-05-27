
import { Component, OnInit } from '@angular/core'

@Component({ 
  selector: 'simple-message', 
  styleUrls: ['./simple-message.component.css'], 
  templateUrl: './simple-message.component.html' 
}) 

export class SimpleMessageComponent implements OnInit { 
  message: string 
  ngOnInit() { 
    this.message = 'No messages, yet'
  }
}



import { Component, OnInit } from '@angular/core'
import { MessageService } from '../services/message.service'

@Component({ 
  selector: 'simple-message', 
  templateUrl: './simple-message.component.html', 
  styleUrls: ['./simple-message.component.css'] 
}) 
export class SimpleMessage Component implements OnInit { 
  message: string 
  constructor( private messageService: MessageService ) { } 
  ngOnInit() { 
    this.messageService.getMessage().subscribe(
      response => this.message = response.message 
    ) 
  } 
}

