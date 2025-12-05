using goals_service.Models;

namespace goals_service.Repositories;

public interface IGoalRepository
{
    Task<List<Goal>> GetAllAsync();
    Task<Goal?> GetByIdAsync(string id);
    Task<Goal> CreateAsync(Goal goal);
    Task<bool> UpdateAsync(string id, Goal goal);
    Task<bool> DeleteAsync(string id);
    Task<List<Goal>> GetByUserIdAsync(long userId);
}

