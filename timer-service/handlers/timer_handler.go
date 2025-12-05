package handlers

import (
	"net/http"
	"strconv"
	"timer-service/models"
	"timer-service/services"

	"github.com/gin-gonic/gin"
)

type TimerHandler struct {
	service services.TimerService
}

func NewTimerHandler(service services.TimerService) *TimerHandler {
	return &TimerHandler{service: service}
}

func (h *TimerHandler) CreateTimer(c *gin.Context) {
	var req models.TimerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	timer, err := h.service.CreateTimer(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, timer)
}

func (h *TimerHandler) GetTimerByID(c *gin.Context) {
	id := c.Param("id")
	timer, err := h.service.GetTimerByID(id)
	if err != nil {
		if err.Error() == "timer not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Timer not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timer)
}

func (h *TimerHandler) GetAllTimers(c *gin.Context) {
	timers, err := h.service.GetAllTimers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timers)
}

func (h *TimerHandler) UpdateTimer(c *gin.Context) {
	id := c.Param("id")
	var req models.TimerRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	timer, err := h.service.UpdateTimer(id, req)
	if err != nil {
		if err.Error() == "timer not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Timer not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timer)
}

func (h *TimerHandler) DeleteTimer(c *gin.Context) {
	id := c.Param("id")
	err := h.service.DeleteTimer(id)
	if err != nil {
		if err.Error() == "timer not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Timer not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}

func (h *TimerHandler) GetTimersByUserID(c *gin.Context) {
	userIDStr := c.Param("userId")
	userID, err := strconv.ParseInt(userIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	timers, err := h.service.GetTimersByUserID(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timers)
}

func (h *TimerHandler) StartTimer(c *gin.Context) {
	id := c.Param("id")
	timer, err := h.service.StartTimer(id)
	if err != nil {
		if err.Error() == "timer not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Timer not found"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timer)
}

func (h *TimerHandler) StopTimer(c *gin.Context) {
	id := c.Param("id")
	timer, err := h.service.StopTimer(id)
	if err != nil {
		if err.Error() == "timer not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": "Timer not found"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, timer)
}

