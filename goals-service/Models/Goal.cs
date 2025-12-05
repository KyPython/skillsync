using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace goals_service.Models;

public class Goal
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    
    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;
    
    [BsonElement("description")]
    public string? Description { get; set; }
    
    [BsonElement("targetDate")]
    public DateTime? TargetDate { get; set; }
    
    [BsonElement("status")]
    public GoalStatus Status { get; set; } = GoalStatus.ACTIVE;
    
    [BsonElement("progress")]
    public int Progress { get; set; } = 0; // 0-100
    
    [BsonElement("category")]
    public string? Category { get; set; }
    
    [BsonElement("userId")]
    public long? UserId { get; set; }
    
    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public enum GoalStatus
{
    ACTIVE,
    COMPLETED,
    PAUSED,
    CANCELLED
}

