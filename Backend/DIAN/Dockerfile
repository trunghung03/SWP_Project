FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
COPY . ./
RUN dotnet restore "DIAN_.csproj"
RUN dotnet build "DIAN_.csproj" -c Release -o /app/build

FROM build-env AS publish
RUN dotnet publish "DIAN_.csproj" -c Release -o /app/publish

# Use the ASP.NET runtime image for the final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
RUN apt-get update && apt-get install -y libkrb5-3

WORKDIR /app
# Copy the published application from the 'publish' stage to the final image
COPY --from=publish /app/publish .
COPY . /app
EXPOSE 8080
ENTRYPOINT ["dotnet", "DIAN_.dll"]