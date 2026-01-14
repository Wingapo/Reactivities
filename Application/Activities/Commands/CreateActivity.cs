using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Guid>
    {
        public required string Title { get; init; }
        public required DateTimeOffset Date { get; init; }
        public required string Description { get; init; }
        public required string Category { get; init; }
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
    
    public class Handler(ApplicationDbContext context) : IRequestHandler<Command, Guid>
    {
        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = new Activity
            {
                Title = request.Title,
                Date = request.Date,
                Description = request.Description,
                Category = request.Category,
                IsCancelled = false,
                City = request.City,
                Venue = request.Venue,
                Latitude = request.Latitude,
                Longitude = request.Longitude,
            };
            
            context.Activities.Add(activity);
            await context.SaveChangesAsync(cancellationToken);
            
            return activity.Id;
        }
    }
}