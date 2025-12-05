package services

import (
	"errors"
	"time"
	"timer-service/models"
	"timer-service/repositories"
)

type TimerService interface {
	CreateTimer(req models.TimerRequest) (*models.TimerResponse, error)
	GetTimerByID(id string) (*models.TimerResponse, error)
	GetAllTimers() ([]*models.TimerResponse, error)
	UpdateTimer(id string, req models.TimerRequest) (*models.TimerResponse, error)
	DeleteTimer(id string) error
	GetTimersByUserID(userID int64) ([]*models.TimerResponse, error)
	StartTimer(id string) (*models.TimerResponse, error)
	StopTimer(id string) (*models.TimerResponse, error)
}

type timerService struct {
	repo repositories.TimerRepository
}

func NewTimerService(repo repositories.TimerRepository) TimerService {
	return &timerService{repo: repo}
}

func (s *timerService) CreateTimer(req models.TimerRequest) (*models.TimerResponse, error) {
	timer := models.NewTimer(req)
	if err := s.repo.Create(timer); err != nil {
		return nil, err
	}
	response := timer.ToResponse()
	return &response, nil
}

func (s *timerService) GetTimerByID(id string) (*models.TimerResponse, error) {
	timer, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}
	response := timer.ToResponse()
	return &response, nil
}

func (s *timerService) GetAllTimers() ([]*models.TimerResponse, error) {
	timers, err := s.repo.GetAll()
	if err != nil {
		return nil, err
	}
	responses := make([]*models.TimerResponse, len(timers))
	for i, timer := range timers {
		response := timer.ToResponse()
		responses[i] = &response
	}
	return responses, nil
}

func (s *timerService) UpdateTimer(id string, req models.TimerRequest) (*models.TimerResponse, error) {
	timer, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	timer.Title = req.Title
	timer.Duration = req.Duration
	timer.Type = req.Type
	timer.UserId = req.UserId
	timer.UpdatedAt = time.Now()

	if err := s.repo.Update(timer); err != nil {
		return nil, err
	}

	response := timer.ToResponse()
	return &response, nil
}

func (s *timerService) DeleteTimer(id string) error {
	return s.repo.Delete(id)
}

func (s *timerService) GetTimersByUserID(userID int64) ([]*models.TimerResponse, error) {
	timers, err := s.repo.GetByUserID(userID)
	if err != nil {
		return nil, err
	}
	responses := make([]*models.TimerResponse, len(timers))
	for i, timer := range timers {
		response := timer.ToResponse()
		responses[i] = &response
	}
	return responses, nil
}

func (s *timerService) StartTimer(id string) (*models.TimerResponse, error) {
	timer, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if timer.Status == models.TimerStatusRunning {
		return nil, errors.New("timer is already running")
	}

	now := time.Now()
	timer.Status = models.TimerStatusRunning
	timer.StartedAt = &now
	timer.UpdatedAt = now

	if err := s.repo.Update(timer); err != nil {
		return nil, err
	}

	response := timer.ToResponse()
	return &response, nil
}

func (s *timerService) StopTimer(id string) (*models.TimerResponse, error) {
	timer, err := s.repo.GetByID(id)
	if err != nil {
		return nil, err
	}

	if timer.Status != models.TimerStatusRunning {
		return nil, errors.New("timer is not running")
	}

	now := time.Now()
	timer.Status = models.TimerStatusStopped
	timer.CompletedAt = &now
	timer.UpdatedAt = now

	// Calculate elapsed time if started
	if timer.StartedAt != nil {
		elapsed := int(now.Sub(*timer.StartedAt).Seconds())
		timer.Elapsed = elapsed
	}

	if err := s.repo.Update(timer); err != nil {
		return nil, err
	}

	response := timer.ToResponse()
	return &response, nil
}

