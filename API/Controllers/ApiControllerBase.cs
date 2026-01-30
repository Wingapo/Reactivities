using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ApiControllerBase : ControllerBase
{
    protected IActionResult Failure(Result result)
    {
        if (result.IsSuccess)
        {
            throw new InvalidOperationException("Cannot convert a successful result to ProblemDetails.");
        }

        var problemDetails = new ProblemDetails
        {
            Instance = Request.Path,
            Title = GetTitle(result.Error.Type),
            Detail = result.Error.Message,
            Status = GetStatusCode(result.Error.Type),
            Extensions =
            {
                ["code"] = result.Error.Code
            }
        };

        if (result.Error is ValidationError validationError)
        {
            problemDetails.Extensions["errors"] = validationError.Errors;
        }

        return new ObjectResult(problemDetails)
        {
            StatusCode = problemDetails.Status
        };
    }
    
    private static string GetTitle(ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.Validation => "Validation Failed",
            ErrorType.Unauthorized => "Unauthorized",
            ErrorType.NotFound => "Resource not found",
            ErrorType.Conflict => "Conflict",
            ErrorType.BadRequest => "Bad Request",
            _ => "Internal server error"
        };
    }

    private static int GetStatusCode(ErrorType errorType)
    {
        return errorType switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.BadRequest => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError,
        };
    }
}