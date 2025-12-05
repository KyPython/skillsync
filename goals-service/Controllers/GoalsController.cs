using goals_service.Models;
using goals_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace goals_service.Controllers;

[ApiController]
[Route("api/goals")]
public class GoalsController : ControllerBase
{
    private readonly IGoalService _goalService;

    public GoalsController(IGoalService goalService)
    {
        _goalService = goalService;
    }

    [HttpPost]
    public async Task<ActionResult<GoalResponse>> CreateGoal([FromBody] GoalRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var goal = await _goalService.CreateGoalAsync(request);
        return CreatedAtAction(nameof(GetGoalById), new { id = goal.Id }, goal);
    }

    [HttpGet]
    public async Task<ActionResult<List<GoalResponse>>> GetAllGoals()
    {
        var goals = await _goalService.GetAllGoalsAsync();
        return Ok(goals);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GoalResponse>> GetGoalById(string id)
    {
        var goal = await _goalService.GetGoalByIdAsync(id);
        if (goal == null)
        {
            return NotFound(new { message = $"Goal not found with id: {id}" });
        }
        return Ok(goal);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<List<GoalResponse>>> GetGoalsByUserId(long userId)
    {
        var goals = await _goalService.GetGoalsByUserIdAsync(userId);
        return Ok(goals);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<GoalResponse>> UpdateGoal(string id, [FromBody] GoalRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var goal = await _goalService.UpdateGoalAsync(id, request);
        if (goal == null)
        {
            return NotFound(new { message = $"Goal not found with id: {id}" });
        }
        return Ok(goal);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGoal(string id)
    {
        var deleted = await _goalService.DeleteGoalAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = $"Goal not found with id: {id}" });
        }
        return NoContent();
    }

    [HttpGet("quote")]
    public async Task<ActionResult<MotivationalQuote>> GetRandomQuote()
    {
        var quote = await _goalService.GetRandomQuoteAsync();
        return Ok(quote);
    }
}

