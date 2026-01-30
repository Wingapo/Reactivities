namespace Application.Core;

public class ValidationError(Dictionary<string, string[]> errors) 
    : Error("VALIDATION_FAILURE", ErrorType.Validation, "One or more validation errors occurred")
{
    public Dictionary<string, string[]> Errors { get; } = errors;
}