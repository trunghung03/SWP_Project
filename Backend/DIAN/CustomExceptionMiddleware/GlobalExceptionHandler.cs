using DIAN_.ExceptionHandler;
using DIAN_.Interfaces;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace DIAN_.CustomExceptionMiddleware
{
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILoggerManager _logger;

        public GlobalExceptionHandler(ILoggerManager logger) => _logger = logger;

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception
             , CancellationToken cancellationToken)
        {
            _logger.LogError($"Something went wrong: {exception}");

            httpContext.Response.ContentType = "application/json";
            httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var problemDetails = new ProblemDetails
            {
                Status = httpContext.Response.StatusCode,
                Title = exception switch
                {
                    AccessViolationException => "Access violation error.",
                    NotFoundException => "The specified resource was not found.",
                    UnauthorizedAccessException => "Access denied.",
                    _ => "An unexpected error occurred."
                },
                Detail = exception.Message,
                Instance = httpContext.Request.Path
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var problemDetailsJson = JsonSerializer.Serialize(problemDetails, options);

            await httpContext.Response.WriteAsync(problemDetailsJson, cancellationToken);

            return true; // Indicate that the exception was handled
        }

    }

    // Assuming NotFoundException is a custom exception you might have
    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }
}