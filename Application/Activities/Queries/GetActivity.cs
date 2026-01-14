using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivity
{
    public class Query : IRequest<Activity>
    {
        public required Guid Id { get; init; }
    }

    public class Handler(ApplicationDbContext context) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Activity not found");
        }
    }
}