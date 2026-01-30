using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result>
    {
        public required Guid Id { get; init; }
    }
    
    public class Handler(ApplicationDbContext context) : IRequestHandler<Command, Result>
    {
        public async Task<Result> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            if (activity == null)
            {
                return ActivityErrors.NotFound(request.Id);
            }
            
            context.Activities.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
    }
}