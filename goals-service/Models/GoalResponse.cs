namespace goals_service.Models;

public class GoalResponse
{
    public string? Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? TargetDate { get; set; }
    public GoalStatus Status { get; set; }
    public int Progress { get; set; }
    public string? Category { get; set; }
    public long? UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

