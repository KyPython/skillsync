using goals_service.Models;

namespace goals_service.Services;

public interface IGoalService
{
    Task<GoalResponse> CreateGoalAsync(GoalRequest request);
    Task<GoalResponse?> GetGoalByIdAsync(string id);
    Task<List<GoalResponse>> GetAllGoalsAsync();
    Task<GoalResponse?> UpdateGoalAsync(string id, GoalRequest request);
    Task<bool> DeleteGoalAsync(string id);
    Task<List<GoalResponse>> GetGoalsByUserIdAsync(long userId);
    Task<MotivationalQuote> GetRandomQuoteAsync();
}

