package controller


import (

	"net/http"
	"github.com/frontierbig/sa-64-example/entity"
	"github.com/gin-gonic/gin"

)


// GET.Nurse/:id

func GETNurse(c *gin.Context) {
	var user entity.Nurse
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM nurses WHERE id = ?", id).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}