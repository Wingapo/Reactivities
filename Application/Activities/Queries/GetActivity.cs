using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivity
{
    public class Query : IRequest<Result<Activity>>
    {
        public required Guid Id { get; init; }
    }

    public class Handler(ApplicationDbContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken);
            return activity != null
                ? Result<Activity>.Success(activity)
                : ActivityErrors.NotFound(request.Id);
        }
    }
}