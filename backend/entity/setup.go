package entity

import (

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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


	Pass1, err := bcrypt.GenerateFromPassword([]byte("1"), 14)
	Pass2, err := bcrypt.GenerateFromPassword([]byte("123"), 14)


	
  
  MedicalRecord1 := MedicalRecord{
	Hospital_number :"001" ,
	Personal_ID     : "1411254655512" ,
	Patient_Name    :"Big" ,
	Patient_Age     : 15 ,
	Patient_Tel     :"0994512351",
	}
	db.Model(&MedicalRecord{}).Create(&MedicalRecord1)

  Nurse1 := Nurse{
      Name:  "Nurse001" ,
	  Email: "big16635@gmail.com" ,
	  Pass :  string (Pass1) ,
	}
	db.Model(&Nurse{}).Create(&Nurse1)


	Nurse2 := Nurse{
		Name:  "Nurse002" ,
		Email: "big@gmail.com" ,
		Pass :  string (Pass2) ,
		}
		db.Model(&Nurse{}).Create(&Nurse2)

  Drug1 := Drug{
	Drug_Name       : "Ruds1",
	Drug_properties : "RUCAAA" ,
	Drug_group      : "NRNS" ,
	Stock           : 10 ,
	}
	db.Model(&Drug{}).Create(&Drug1)
	

  

}
