using Application.Core;

namespace Application.Activities;

public static class ActivityErrors
{
    public static Error NotFound(Guid activityId) => new(
        "ACTIVITY.NOT_FOUND",
        ErrorType.NotFound,
        $"Activity with ID '{activityId}' was not found"
    );
}