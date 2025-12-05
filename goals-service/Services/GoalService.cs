using goals_service.Models;
using goals_service.Repositories;

namespace goals_service.Services;

public class GoalService : IGoalService
{
    private readonly IGoalRepository _repository;
    private readonly List<MotivationalQuote> _quotes = new()
    {
        new MotivationalQuote { Text = "The only way to do great work is to love what you do.", Author = "Steve Jobs" },
        new MotivationalQuote { Text = "Innovation distinguishes between a leader and a follower.", Author = "Steve Jobs" },
        new MotivationalQuote { Text = "Life is what happens to you while you're busy making other plans.", Author = "John Lennon" },
        new MotivationalQuote { Text = "The future belongs to those who believe in the beauty of their dreams.", Author = "Eleanor Roosevelt" },
        new MotivationalQuote { Text = "It is during our darkest moments that we must focus to see the light.", Author = "Aristotle" },
        new MotivationalQuote { Text = "The way to get started is to quit talking and begin doing.", Author = "Walt Disney" },
        new MotivationalQuote { Text = "Don't let yesterday take up too much of today.", Author = "Will Rogers" },
        new MotivationalQuote { Text = "You learn more from failure than from success.", Author = "Unknown" }
    };

    public GoalService(IGoalRepository repository)
    {
        _repository = repository;
    }

    public async Task<GoalResponse> CreateGoalAsync(GoalRequest request)
    {
        var goal = new Goal
        {
            Title = request.Title,
            Description = request.Description,
            TargetDate = request.TargetDate,
            Status = request.Status,
            Progress = request.Progress,
            Category = request.Category,
            UserId = request.UserId
        };

        var created = await _repository.CreateAsync(goal);
        return MapToResponse(created);
    }

    public async Task<GoalResponse?> GetGoalByIdAsync(string id)
    {
        var goal = await _repository.GetByIdAsync(id);
        return goal == null ? null : MapToResponse(goal);
    }

    public async Task<List<GoalResponse>> GetAllGoalsAsync()
    {
        var goals = await _repository.GetAllAsync();
        return goals.Select(MapToResponse).ToList();
    }

    public async Task<GoalResponse?> UpdateGoalAsync(string id, GoalRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing == null) return null;

        existing.Title = request.Title;
        existing.Description = request.Description;
        existing.TargetDate = request.TargetDate;
        existing.Status = request.Status;
        existing.Progress = request.Progress;
        existing.Category = request.Category;
        existing.UserId = request.UserId;

        var updated = await _repository.UpdateAsync(id, existing);
        if (!updated) return null;

        var updatedGoal = await _repository.GetByIdAsync(id);
        return updatedGoal == null ? null : MapToResponse(updatedGoal);
    }

    public async Task<bool> DeleteGoalAsync(string id)
    {
        return await _repository.DeleteAsync(id);
    }

    public async Task<List<GoalResponse>> GetGoalsByUserIdAsync(long userId)
    {
        var goals = await _repository.GetByUserIdAsync(userId);
        return goals.Select(MapToResponse).ToList();
    }

    public Task<MotivationalQuote> GetRandomQuoteAsync()
    {
        var random = new Random();
        var quote = _quotes[random.Next(_quotes.Count)];
        return Task.FromResult(quote);
    }

    private static GoalResponse MapToResponse(Goal goal)
    {
        return new GoalResponse
        {
            Id = goal.Id,
            Title = goal.Title,
            Description = goal.Description,
            TargetDate = goal.TargetDate,
            Status = goal.Status,
            Progress = goal.Progress,
            Category = goal.Category,
            UserId = goal.UserId,
            CreatedAt = goal.CreatedAt,
            UpdatedAt = goal.UpdatedAt
        };
    }
}

