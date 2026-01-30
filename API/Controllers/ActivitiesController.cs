using Application.Activities.Commands;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


public class ActivitiesController(IMediator mediator) : ApiControllerBase
{
    public record CreateActivityDto(
        string Title,
        DateTimeOffset Date,
        string Description,
        string Category,
        string City,
        string Venue,
        double Latitude,
        double Longitude
    );

    public record UpdateActivityDto(
        string Title,
        DateTimeOffset Date,
        string Description,
        string Category,
        bool IsCancelled,
        string City,
        string Venue,
        double Latitude,
        double Longitude
    );
    
    [HttpGet]
    public async Task<IActionResult> GetActivities(CancellationToken cancellationToken)
    {
        var query = new GetActivities.Query();
        var result = await mediator.Send(query, cancellationToken);
        return result.IsSuccess
            ? Ok(result.Value)
            : Failure(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetActivity(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var query = new GetActivity.Query
        {
            Id = id
        };
        var result = await mediator.Send(query, cancellationToken);
        return result.IsSuccess 
            ? Ok(result.Value) 
            : Failure(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(
        [FromBody] CreateActivityDto dto,
        CancellationToken cancellationToken)
    {
        var command = new CreateActivity.Command
        {
            Title = dto.Title,
            Date = dto.Date,
            Description = dto.Description,
            Category = dto.Category,
            City = dto.City,
            Venue = dto.Venue,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };
        var result = await mediator.Send(command, cancellationToken);
        return result.IsSuccess 
            ? CreatedAtAction(nameof(CreateActivity), result.Value) 
            : Failure(result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateActivity(
        [FromRoute] Guid id,
        [FromBody] UpdateActivityDto dto,
        CancellationToken cancellationToken)
    {
        var command = new UpdateActivity.Command
        {
            Id = id,
            Title = dto.Title,
            Date = dto.Date,
            Description = dto.Description,
            Category = dto.Category,
            IsCancelled = dto.IsCancelled,
            City = dto.City,
            Venue = dto.Venue,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };
        var result = await mediator.Send(command, cancellationToken);
        return result.IsSuccess 
            ? NoContent() 
            : Failure(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteActivity(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var command = new DeleteActivity.Command
        {
            Id = id
        };
        var result = await mediator.Send(command, cancellationToken);
        return result.IsSuccess 
            ? NoContent() 
            : Failure(result);
    }
}