import{Contrat} from './contrat'
export class Ressource {
    id: number;
    nom: String ;
    prenom: String ;
    matricule: number ;
    dateEntree : Date ;

      
constructor( id: number , nom: String , prenom: String ,matricule: number ,dateEntree : Date ){
    id : this.id;
    nom: this.nom;
     prenom: this.prenom; 
     matricule: this.matricule;
       dateEntree: this.dateEntree;    
}
}