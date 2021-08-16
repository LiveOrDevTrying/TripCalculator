﻿using System;
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

        Task<PayloadDTO> GetPayloadAsync(Guid applicationUserId);

        Task<UserDTO[]> GetUsersAsync(Guid applicationUserId);
        Task<UserVM> GetUserAsync(Guid userId, Guid applicationUserId);
        Task<UserDTO> CreateUserAsync(UserCreateRequest request, Guid applicationUserId);
        Task<UserDTO> UpdateUserAsync(Guid id, UserUpdateRequest request, Guid applicationUserId);
        Task<bool> DeleteUserAsync(Guid id, Guid applicationUserId);

        Task<TripDTO[]> GetTripsAsync(Guid applicationUserId);
        Task<TripVM> GetTripAsync(Guid tripId, Guid applicationUserId);
        Task<TripVM> CreateTripAsync(TripCreateRequest request, Guid applicationUserId);
        Task<TripVM> UpdateTripAsync(Guid id, TripUpdateRequest request, Guid applicationUserId);
        Task<bool> DeleteTripAsync(Guid id, Guid applicationUserId);

        Task<TripUserDTO[]> GetTripsUsersAsync(Guid[] tripIds, Guid applicationUserId);
        Task<TripUserDTO[]> GetTripUsersAsync(Guid tripId, Guid applicationUserId);
        Task<TripUserDTO> GetTripUserAsync(Guid tripUserId, Guid applicationUserId);
        Task<TripUserDTO> CreateTripUserAsync(TripUserCreateRequest request, Guid applicationUserId);
        Task<bool> DeleteTripUserAsync(Guid id, Guid applicationUserId);

        Task<ExpenseDTO[]> GetExpensesAsync(Guid[] tripUserIds, Guid applicationUserId);
        Task<ExpenseDTO[]> GetExpensesAsync(Guid tripUserId, Guid applicationUserId);
        Task<ExpenseDTO> GetExpenseAsync(Guid expenseId, Guid applicationUserId);
        Task<ExpenseDTO> CreateExpenseAsync(ExpenseCreateRequest request, Guid applicationUserId);
        Task<ExpenseDTO> UpdateExpenseAsync(Guid id, ExpenseUpdateRequest request, Guid applicationUserId);
        Task<bool> DeleteExpenseAsync(Guid id, Guid applicationUserId);
    }
}
