using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace API.Handlers;

public class GlobalExceptionHandler(
    IProblemDetailsService problemDetailsService,
    ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        logger.LogError("Unhandled exception at {Path} with method {Method}: {Error}", 
            httpContext.Request.Path, httpContext.Request.Method, exception.Message);
        
        return problemDetailsService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            ProblemDetails = new ProblemDetails
            {
                Instance = httpContext.Request.Path,
                Status = StatusCodes.Status500InternalServerError,
                Title = "Internal server error",
                Detail = "An error occurred while processing request"
            }
        });
    }
}