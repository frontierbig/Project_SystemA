package main

import (
	"github.com/frontierbig/sa-64-example/controller/Drugallergycontro"

	"github.com/frontierbig/sa-64-example/entity"

	"github.com/gin-gonic/gin"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// User Routes
	
	r.GET("/api/MedicalRecord", controller.ListMedicalRecord)
	r.GET("/api/Nurse", controller.ListNurse)
	r.GET("/api/Drug", controller.ListDrug)
	r.GET("/api/DrugAllergy", controller.ListDrugAllergy)
	r.POST("/api/submit", controller.CreateDrugAllergy)
	
	// Run the server

	r.Run()

}
func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
