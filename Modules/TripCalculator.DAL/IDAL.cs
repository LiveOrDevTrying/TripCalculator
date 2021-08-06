using System;
using System.Threading.Tasks;
using TripCalculator.Lib.DTOs;
using TripCalculator.Lib.Requests;
using TripCalculator.Lib.ViewModels;

namespace TripCalculator.DAL
{
    public interface IDAL
    {
        Task<ApplicationUserDTO> GetApplicationUserAsync(string aspNetUserId);
        Task<ApplicationUserDTO> CreateApplicationUserAsync(ApplicationUserCreateRequest request, string aspNetUserId);

        Task<Payload> GetPayloadAsync(Guid applicationUserId);

        Task<UserDTO[]> GetUsersAsync(Guid applicationUserId);
        Task<UserVM> GetUserAsync(Guid userId, Guid applicationUserId);
        Task<UserDTO> CreateUserAsync(UserCreateRequest request, Guid applicationUserId);
        Task<UserDTO> UpdateUserAsync(Guid id, UserUpdateRequest request, Guid applicationUserId);
        Task<bool> DeleteUserAsync(Guid id, Guid applicationUserId);

        Task<TripDTO[]> GetTripsAsync(Guid applicationUserId);
        Task<TripVM> GetTripAsync(Guid tripId, Guid applicationUserId);
        Task<TripDTO> CreateTripAsync(TripCreateRequest request, Guid applicationUserId);
        Task<TripDTO> UpdateTripAsync(Guid id, TripUpdateRequest request, Guid applicationUserId);
        Task<bool> DeleteTripAsync(Guid id, Guid applicationTripId);

        Task<TripUserDTO[]> GetTripsUsersAsync(Guid tripId, Guid applicationUserId);
        Task<TripUserVM> GetTripUserAsync(Guid tripUserId, Guid applicationUserId);
        Task<TripDTO> CreateTripUserAsync(TripUserCreateRequest request, Guid applicationUserId);
        Task<bool> DeleteTripUserAsync(Guid id, Guid applicationTripId);
    }
}
