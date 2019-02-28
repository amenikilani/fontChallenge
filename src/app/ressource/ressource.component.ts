import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RessourceService } from '../ressource.service';
import { Ressource } from '../ressource';

@Component({
   selector: 'app-ressource',
   templateUrl: './ressource.component.html',
   styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit { 
   //Component properties
   allRessources: Ressource[];
   statusCode: number;
   requestProcessing = false;
   ressourceIdToUpdate = null;
   processValidation = false;
   files : FileList; 
   //Create form
   ressourceForm = new FormGroup({
		id: new FormControl('', Validators.required),
		nom: new FormControl('', Validators.required),	
		prenom: new FormControl('', Validators.required),	   
		matricule: new FormControl('', Validators.required) ,
		dateEntree: new FormControl('', Validators.required) 

	   
   });
   //Create constructor to get service instance
   constructor(private ressourceService: RessourceService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllRessources();
   }   
   getFiles(event){ 
	this.files = event.target.files; 
} 
logForm(event) { 
	 console.log(this.files); 
} 
   //Fetch all articles
   getAllRessources() {
        this.ressourceService.getAllRessources()
		  .subscribe(
                data => this.allRessources = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update article
   onRessourceFormSubmit() {
	  this.processValidation = true;   
	  if (this.ressourceForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  this.preProcessConfigurations();
	  let ressource= this.ressourceForm.value;
	  if (this.ressourceIdToUpdate === null) {  
	    //Generate article id then create article
        this.ressourceService.getAllRessources()
	     .subscribe(ressources => {
			 
		   //Generate article id	 
		   let maxIndex = ressources.length - 1;
		   let issueWithMaxIndex = ressources[maxIndex];
		   let ressourceId = issueWithMaxIndex.id + 1;
		   ressource.id = ressourceId;
		
		   //Create article
     	   this.ressourceService.createRessource(ressource)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllRessources();	
					this.backToCreateRessource();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });		
	  } else {  
   	    //Handle update article
        ressource.id = this.ressourceIdToUpdate; 		
	    this.ressourceService.updateRessource(ressource)
	      .subscribe(successCode => {
		            this.statusCode = successCode;
				    this.getAllRessources();	
					this.backToCreateRessource();
			    },
		        errorCode => this.statusCode = errorCode);	  
	  }
   }
   //Load article by id to edit
   loadRessourceToEdit(ressourceId: String) {
      this.preProcessConfigurations();
      this.ressourceService.getRessourceById(ressourceId)
	      .subscribe(ressource => {
		            this.ressourceIdToUpdate = ressource.id;   
					this.ressourceForm.setValue({nom: ressource.nom,
						prenom: ressource.prenom, 
            matricule : ressource.matricule,
          dateEntree : ressource.dateEntree });
					this.processValidation = true;
					this.requestProcessing = false;   
		        },
		        errorCode =>  this.statusCode = errorCode);   
   }
   //Delete article
   deleteRessource(issueId: String) {
      this.preProcessConfigurations();
      this.ressourceService.deleteRessourceById(issueId)
	      .subscribe(successCode => {
		            //this.statusCode = successCode;
					//Expecting success code 204 from server
					this.statusCode = 204;
				    this.getAllRessources();	
				    this.backToCreateRessource();
			    },
		        errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
	  this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateRessource() {
      this.ressourceIdToUpdate = null;
      this.ressourceForm.reset();	  
	  this.processValidation = false;
   }
}
    
