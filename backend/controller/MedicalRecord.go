package controller

import (
	"net/http"
	"github.com/frontierbig/sa-64-example/entity"
	"github.com/gin-gonic/gin"
)

func ListMedicalRecord(c *gin.Context) {
	var MedicalRecord []entity.MedicalRecord
	if err := entity.DB().Table("medical_records").Find(&MedicalRecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": MedicalRecord})
}