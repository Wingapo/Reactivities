using Application.Core;
using FluentValidation;
using MediatR;

namespace Application.Behaviors;

public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators) 
    : IPipelineBehavior<TRequest, TResponse> 
    where TRequest : IRequest<TResponse>
    where TResponse : Result
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!validators.Any())
        {
            return await next(cancellationToken);
        }
        
        var context = new ValidationContext<TRequest>(request);
        var failures = validators
            .Select(validator => validator.Validate(context))
            .SelectMany(result => result.Errors)
            .Where(failure => failure != null)
            .ToList();
    
        if (failures.Count == 0)
        {
            return await next(cancellationToken);
        }
        
        var errors = failures
            .GroupBy(
                failure => failure.PropertyName,
                failure => failure.ErrorMessage)
            .ToDictionary(
                grouping => grouping.Key,
                grouping => grouping.ToArray());

        var error = new ValidationError(errors);
        
        return !typeof(TResponse).IsGenericType
            ? (TResponse)Result.Failure(error)
            : (typeof(TResponse)
                .GetGenericTypeDefinition()
                .MakeGenericType(typeof(TResponse).GenericTypeArguments[0])
                .GetMethod(nameof(Result.Failure))!
                .Invoke(null, [error]) as TResponse)!;
    }
}


