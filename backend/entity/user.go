package entity

import (
	"time"

	"gorm.io/gorm"
)

type Nurse struct {
	gorm.Model
	Name  string
	Email string `gorm:"uniqueIndex"`
	Pass  string


	DrugAllergies []DrugAllergy `gorm:"foreignKey:NurseID"`
}

type MedicalRecord struct {
	gorm.Model
	Hospital_number string `gorm:"uniqueIndex"`
	Personal_ID     string `gorm:"uniqueIndex"`
	Patient_Name    string
	Patient_Age     uint
	Patient_Tel     string
	DrugAllergies   []DrugAllergy `gorm:"foreignKey:MedicalRecordID"`
}

type Drug struct {
	gorm.Model
	Drug_Name       string
	Drug_properties string
	Drug_group      string
	Stock           uint
	DrugAllergies   []DrugAllergy `gorm:"foreignKey:DrugID"`
}

type DrugAllergy struct {
	gorm.Model

	MedicalRecordID *uint
	MedicalRecord   MedicalRecord

	DrugID *uint
	Drug   Drug

	DrugAllergy string

	NurseID *uint
	Nurse   Nurse

	AddedTime time.Time
}
