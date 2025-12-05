package repositories

import (
	"sync"
	"timer-service/models"
)

type TimerRepository interface {
	Create(timer *models.Timer) error
	GetByID(id string) (*models.Timer, error)
	GetAll() ([]*models.Timer, error)
	Update(timer *models.Timer) error
	Delete(id string) error
	GetByUserID(userID int64) ([]*models.Timer, error)
}

type InMemoryTimerRepository struct {
	timers map[string]*models.Timer
	mu     sync.RWMutex
}

func NewInMemoryTimerRepository() *InMemoryTimerRepository {
	return &InMemoryTimerRepository{
		timers: make(map[string]*models.Timer),
	}
}

func (r *InMemoryTimerRepository) Create(timer *models.Timer) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.timers[timer.ID] = timer
	return nil
}

func (r *InMemoryTimerRepository) GetByID(id string) (*models.Timer, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	timer, exists := r.timers[id]
	if !exists {
		return nil, ErrTimerNotFound
	}
	return timer, nil
}

func (r *InMemoryTimerRepository) GetAll() ([]*models.Timer, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	timers := make([]*models.Timer, 0, len(r.timers))
	for _, timer := range r.timers {
		timers = append(timers, timer)
	}
	return timers, nil
}

func (r *InMemoryTimerRepository) Update(timer *models.Timer) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, exists := r.timers[timer.ID]; !exists {
		return ErrTimerNotFound
	}
	r.timers[timer.ID] = timer
	return nil
}

func (r *InMemoryTimerRepository) Delete(id string) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, exists := r.timers[id]; !exists {
		return ErrTimerNotFound
	}
	delete(r.timers, id)
	return nil
}

func (r *InMemoryTimerRepository) GetByUserID(userID int64) ([]*models.Timer, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	var userTimers []*models.Timer
	for _, timer := range r.timers {
		if timer.UserId != nil && *timer.UserId == userID {
			userTimers = append(userTimers, timer)
		}
	}
	return userTimers, nil
}

