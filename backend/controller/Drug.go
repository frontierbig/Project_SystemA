package controller

import (
	"net/http"
	"github.com/frontierbig/sa-64-example/entity"
	"github.com/gin-gonic/gin"
)

func ListDrug(c *gin.Context) {
	var Drug []entity.Drug
	if err := entity.DB().Table("drugs").Find(&Drug).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Drug})
}