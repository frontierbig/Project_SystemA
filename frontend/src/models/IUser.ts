export interface MedicalRecordInterface {
    ID: number,
    
    Hospital_number :string , 
	Personal_ID     :string , 
	Patient_Name    :string ,
	Patient_Age     :number ,
	Patient_Tel     :string ,

}
export interface DrugAllergyInterface {
    ID: number,
	MedicalRecordID: number,
	MedicalRecord:  MedicalRecordInterface,
	DrugID:  number,
	Drug :  DrugInterface,
	DrugAllergy: string,
	NurseID : number
	Nurse:   NurseInterface,
	AddedTime : Date,
}



export interface NurseInterface {
    ID: number,
    Name:  string ,
	Email: string ,
	Pass:  string ,
}




export interface DrugInterface {
    ID: number,
    Drug_Name      : string ,
	Drug_properties : string ,
	Drug_group      : string ,
	Stock           : number ,
}