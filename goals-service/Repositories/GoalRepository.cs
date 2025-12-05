using goals_service.Models;
using MongoDB.Driver;

namespace goals_service.Repositories;

public class GoalRepository : IGoalRepository
{
    private readonly IMongoCollection<Goal> _goals;

    public GoalRepository(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
        _goals = database.GetCollection<Goal>("goals");
    }

    public async Task<List<Goal>> GetAllAsync()
    {
        return await _goals.Find(goal => true).ToListAsync();
    }

    public async Task<Goal?> GetByIdAsync(string id)
    {
        return await _goals.Find(goal => goal.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Goal> CreateAsync(Goal goal)
    {
        goal.CreatedAt = DateTime.UtcNow;
        goal.UpdatedAt = DateTime.UtcNow;
        await _goals.InsertOneAsync(goal);
        return goal;
    }

    public async Task<bool> UpdateAsync(string id, Goal goal)
    {
        goal.UpdatedAt = DateTime.UtcNow;
        var result = await _goals.ReplaceOneAsync(g => g.Id == id, goal);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var result = await _goals.DeleteOneAsync(goal => goal.Id == id);
        return result.DeletedCount > 0;
    }

    public async Task<List<Goal>> GetByUserIdAsync(long userId)
    {
        return await _goals.Find(goal => goal.UserId == userId).ToListAsync();
    }
}

