package entity

import (
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db
}
func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("saproject.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// Migrate the schema
	database.AutoMigrate(&Nurse{}, &MedicalRecord{},&Drug{},& DrugAllergy{})

	db = database
  
  MedicalRecord1 := MedicalRecord{
	Hospital_number :"001" ,
	Personal_ID     : "1411254655512" ,
	Patient_Name    :"Big" ,
	Patient_Age     : 15 ,
	Patient_Tel     :"0994512351",
	}
	db.Model(&MedicalRecord{}).Create(&MedicalRecord1)

  Nurse1 := Nurse{
    NurseName:  "Nurse001" ,
	  NurseEmail: "big16635@gmail.com" ,
	  NursePass:  "123zaza" ,
	}
	db.Model(&Nurse{}).Create(&Nurse1)

  Drug1 := Drug{
	Drug_Name       : "Ruds1",
	Drug_properties : "RUCAAA" ,
	Drug_group      : "NRNS" ,
	Stock           : 10 ,
	}
	db.Model(&Drug{}).Create(&Drug1)

  

}
