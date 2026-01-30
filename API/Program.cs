using API.Handlers;
using Microsoft.EntityFrameworkCore;
using Application;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddControllers(options => options.ModelValidatorProviders.Clear());

services.AddProblemDetails();
services.AddExceptionHandler<GlobalExceptionHandler>();

services.AddDbContext<ApplicationDbContext>(options => 
    options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

var allowedOrigins = configuration["CLIENT_APP_URLS"]
    ?.Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries) ?? [];
services.AddCors(options => 
    options.AddDefaultPolicy(policy => 
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()));

services.AddApplication();

var app = builder.Build();

app.UseExceptionHandler();

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/", () => "ok");

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.Initialize(context);
}

app.Run();