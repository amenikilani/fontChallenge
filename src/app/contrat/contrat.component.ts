import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ContratService } from '../contrat.service';
import { Contrat } from '../contrat';

@Component({
   selector: 'app-contrat',
   templateUrl: './contrat.component.html',
   styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit { 
   //Component properties
   allContrats: Contrat[];
   statusCode: number;
   requestProcessing = false;
   contratIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form
   contratForm = new FormGroup({
		id: new FormControl('', Validators.required),
		type: new FormControl('', Validators.required),	
		mission: new FormControl('', Validators.required),	   
		commentaire: new FormControl('', Validators.required) 

	   
   });
   //Create constructor to get service instance
   constructor(private contratService: ContratService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllContrats();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllContrats() {
        this.contratService.getAllContrats()
		  .subscribe(
                data => this.allContrats = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onContratFormSubmit() {
	  this.processValidation = true;   
	  if (this.contratForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let contrat= this.contratForm.value;
	  if (this.contratIdToUpdate === null) {  
	    //Generate article id then create article
        this.contratService.getAllContrats()
	     .subscribe(contrats => {
			 
		   //Generate article id	 
		   let maxIndex = contrats.length - 1;
		   let issueWithMaxIndex = contrats[maxIndex];
		   let contratId = issueWithMaxIndex.id + 1;
		   contrat.id = contratId;
		
		   //Create article
     	   this.contratService.createContrat(contrat)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllContrats();	
					this.backToCreateContrat();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        contrat.id = this.contratIdToUpdate; 		
	    this.contratService.updateContrat(contrat)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllContrats();	
					this.backToCreateContrat();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadContratToEdit(contratId: String) {
      this.preProcessConfigurations();
      this.contratService.getContratById(contratId)
	      .subscribe(contrat => {
		            this.contratIdToUpdate = contrat.id;   
					this.contratForm.setValue({type: contrat.type,
						mission: contrat.mission, 
						commentaire : contrat.commentaire });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteContrat(issueId: String) {
      this.preProcessConfigurations();
      this.contratService.deleteContratById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllContrats();	
				    this.backToCreateContrat();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateContrat() {
      this.contratIdToUpdate = null;
      this.contratForm.reset();	  
	  this.processValidation = false;
   }
}
    
