#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["TripCalculator.WebAPI/TripCalculator.WebAPI.csproj", "TripCalculator.WebAPI/"]
RUN dotnet restore "TripCalculator.WebAPI/TripCalculator.WebAPI.csproj"
COPY . .
WORKDIR "/src/TripCalculator.WebAPI"
RUN dotnet build "TripCalculator.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TripCalculator.WebAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TripCalculator.WebAPI.dll"]