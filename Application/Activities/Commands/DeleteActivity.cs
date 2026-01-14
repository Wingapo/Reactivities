using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required Guid Id { get; init; }
    }
    
    public class Handler(ApplicationDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Activity not found");
            
            context.Activities.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}