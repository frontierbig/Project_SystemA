package controller

import (
	"net/http"

	"github.com/Project/entity"
	"github.com/gin-gonic/gin"
)

func CreateDrugAllergy(c *gin.Context) {

	var Nurse entity.Nurse
	var MedicalRecord entity.MedicalRecord
	var Drug entity.Drug
	var DrugAllergy entity.DrugAllergy

	//  bind เข้าตัวแปร DrugAllergy
	if err := c.ShouldBindJSON(&DrugAllergy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // 8: ค้นหา Nurse ด้วย id--------------------------
	if Nur := entity.DB().Where("id = ?", DrugAllergy.NurseID).First(&Nurse); Nur.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nurse not found"})
		return
	}

	// 9: ค้นหา MedicalRecord ด้วย id
	if Mr := entity.DB().Where("id = ?", DrugAllergy.MedicalRecordID).First(&MedicalRecord); Mr.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "MedicalRecord not found"})
		return
	}

	// 10: ค้นหา Drug ด้วย id
	if Dru := entity.DB().Where("id = ?", DrugAllergy.DrugID).First(&Drug); Dru.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Drug not found"})
		return
	}

	// 11: สร้าง DrugAllergy
	Da := entity.DrugAllergy{
		Nurse:         Nurse,
		MedicalRecord: MedicalRecord,
		Drug:          Drug,
		DrugAllergy:   DrugAllergy.DrugAllergy,
		AddedTime:     DrugAllergy.AddedTime,
	}

	// 12: บันทึก
	if err := entity.DB().Create(&Da).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Da})
}

func ListDrugAllergy(c *gin.Context) {
	var DrugAllergy []entity.DrugAllergy
	if err := entity.DB().Preload("Nurse").Preload("MedicalRecord").Preload("Drug").Table("drug_allergies").Find(&DrugAllergy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": DrugAllergy})
}
