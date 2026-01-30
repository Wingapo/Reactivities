namespace Application.Core;

public class Result
{
    public bool IsSuccess { get; }
    public Error Error { get; }
    
    protected Result(bool isSuccess, Error error)
    {
        if ((isSuccess && error.Type != ErrorType.None) 
            || (!isSuccess && error.Type == ErrorType.None))
        {
            throw new InvalidOperationException();
        }
        
        IsSuccess = isSuccess;
        Error = error;
    }
    
    public static Result Success() => new(true, Error.None);
    public static Result Failure(Error error) => new Result(false, error);
    
    public static implicit operator Result(Error error) => Failure(error);
}


public class Result<T> : Result
{
    public T Value { get; }

    protected Result(T value, bool isSuccess, Error error) : base(isSuccess, error)
    {
        Value = value;
    }
    
    public static Result<T> Success(T value) => new(value, true, Error.None);
    public new static Result<T> Failure(Error error) => new(default!, false, error);
    
    public static implicit operator Result<T>(Error error) => Failure(error);
}