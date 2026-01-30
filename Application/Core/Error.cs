namespace Application.Core;

public class Error(
    string code,
    ErrorType type,
    string message)
{
    public string Code { get; } = code;
    public ErrorType Type { get; } = type;
    public string Message { get; } = message;
    
    public static readonly Error None = new("NONE", ErrorType.None, string.Empty);
}