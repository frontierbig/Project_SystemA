package controller

import (
	"net/http"
	"github.com/frontierbig/sa-64-example/entity"
	"github.com/gin-gonic/gin"
)

func ListNurse(c *gin.Context) {
	var nurse []entity.Nurse
	if err := entity.DB().Table("nurses").Find(&nurse).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nurse})
}