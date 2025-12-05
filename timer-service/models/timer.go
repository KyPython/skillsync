package models

import (
	"time"

	"github.com/google/uuid"
)

type TimerStatus string

const (
	TimerStatusIdle    TimerStatus = "IDLE"
	TimerStatusRunning TimerStatus = "RUNNING"
	TimerStatusPaused  TimerStatus = "PAUSED"
	TimerStatusStopped TimerStatus = "STOPPED"
)

type Timer struct {
	ID          string       `json:"id"`
	Title       string       `json:"title" binding:"required"`
	Duration    int          `json:"duration"`    // Duration in minutes
	Elapsed     int          `json:"elapsed"`    // Elapsed time in seconds
	Status      TimerStatus  `json:"status"`
	Type        string       `json:"type"`       // e.g., "POMODORO", "CUSTOM"
	UserId      *int64       `json:"userId,omitempty"`
	StartedAt   *time.Time   `json:"startedAt,omitempty"`
	CompletedAt *time.Time   `json:"completedAt,omitempty"`
	CreatedAt   time.Time    `json:"createdAt"`
	UpdatedAt   time.Time    `json:"updatedAt"`
}

type TimerRequest struct {
	Title    string  `json:"title" binding:"required"`
	Duration int     `json:"duration" binding:"required,min=1"`
	Type     string  `json:"type"`
	UserId   *int64  `json:"userId,omitempty"`
}

type TimerResponse struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	Duration    int        `json:"duration"`
	Elapsed     int        `json:"elapsed"`
	Status      TimerStatus `json:"status"`
	Type        string     `json:"type"`
	UserId      *int64     `json:"userId,omitempty"`
	StartedAt   *time.Time `json:"startedAt,omitempty"`
	CompletedAt *time.Time `json:"completedAt,omitempty"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
}

func NewTimer(req TimerRequest) *Timer {
	now := time.Now()
	return &Timer{
		ID:        uuid.New().String(),
		Title:     req.Title,
		Duration:  req.Duration,
		Elapsed:   0,
		Status:    TimerStatusIdle,
		Type:      req.Type,
		UserId:    req.UserId,
		CreatedAt: now,
		UpdatedAt: now,
	}
}

func (t *Timer) ToResponse() TimerResponse {
	return TimerResponse{
		ID:          t.ID,
		Title:       t.Title,
		Duration:    t.Duration,
		Elapsed:     t.Elapsed,
		Status:      t.Status,
		Type:        t.Type,
		UserId:      t.UserId,
		StartedAt:   t.StartedAt,
		CompletedAt: t.CompletedAt,
		CreatedAt:   t.CreatedAt,
		UpdatedAt:   t.UpdatedAt,
	}
}

