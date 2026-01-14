using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivity
{
    public class Command : IRequest
    {
        public required Guid Id { get; init; }
        public required string Title { get; init; }
        public required DateTimeOffset Date { get; init; }
        public required string Description { get; init; }
        public required string Category { get; init; }
        public required bool IsCancelled { get; init; }
        public required string City { get; init; }
        public required string Venue { get; init; }
        public required double Latitude { get; init; }
        public required double Longitude { get; init; }
    }

    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Description)
                .NotEmpty()
                .MaximumLength(500);

            RuleFor(x => x.Category)
                .NotEmpty()
                .MaximumLength(50);

            RuleFor(x => x.City)
                .NotEmpty()
                .MaximumLength(100);

            RuleFor(x => x.Venue)
                .NotEmpty()
                .MaximumLength(100);
            
            RuleFor(x => x.Latitude)
                .InclusiveBetween(-90, 90);

            RuleFor(x => x.Longitude)
                .InclusiveBetween(-180, 180);
        }
    }
    
    public sealed class Handler(ApplicationDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken) 
                           ?? throw new Exception("Activity not found");
            
            activity.Title = request.Title;
            activity.Date = request.Date;
            activity.Description = request.Description;
            activity.Category = request.Category;
            activity.IsCancelled = request.IsCancelled;
            activity.City = request.City;
            activity.Venue = request.Venue;
            activity.Latitude = request.Latitude;
            activity.Longitude = request.Longitude;

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}