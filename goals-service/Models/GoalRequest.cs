using System.ComponentModel.DataAnnotations;

namespace goals_service.Models;

public class GoalRequest
{
    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; } = string.Empty;
    
    public string? Description { get; set; }
    
    public DateTime? TargetDate { get; set; }
    
    public GoalStatus Status { get; set; } = GoalStatus.ACTIVE;
    
    [Range(0, 100, ErrorMessage = "Progress must be between 0 and 100")]
    public int Progress { get; set; } = 0;
    
    public string? Category { get; set; }
    
    public long? UserId { get; set; }
}

