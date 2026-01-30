using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : ApiControllerBase
{
    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return Failure(new Error(
            "DEBUG.NOT_FOUND", 
            ErrorType.NotFound, 
            "This is not found error for debug"));
    }

    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {
        return Failure(new Error(
            "DEBUG.BAD_REQUEST",
            ErrorType.BadRequest,
            "This is bad request error for debug"));
    }

    [HttpGet("unauthorised")]
    public IActionResult GetUnauthorised()
    {
        return Failure(new Error(
            "DEBUG.UNAUTHORIED",
            ErrorType.Unauthorized,
            "This is unauthorized error for debug"));
    }
    
    [HttpGet("server-error")]
    public IActionResult GetServerError() => throw new Exception();
}