using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TripCalculator.DAL;
using TripCalculator.Lib.DTOs;
using TripCalculator.Lib.Requests;
using TripCalculator.Lib.ViewModels;

namespace TripCalculator.BLL
{
    public class BLL : IBLL
    {
        protected readonly IDAL _dal;
        protected readonly IMapper _mapper;

        public BLL(IDAL dal,
            IMapper mapper)
        {
            _dal = dal;
            _mapper = mapper;
        }

        public virtual async Task<PayloadVM> GetPayloadAsync(Guid applicationUserId)
        {
            var vm = _mapper.Map<PayloadVM>(await _dal.GetPayloadAsync(applicationUserId));
            vm.TripUsersReimburse = await GetTripUsersReimbursesAsync(vm.Trips.Select(x => x.Id).ToArray(), applicationUserId);
            return vm;
        }

        public virtual async Task<ExpenseVM> GetExpenseAsync(Guid expenseId, Guid applicationUserId)
        {
            return await GetExpenseAsync(await _dal.GetExpenseAsync(expenseId, applicationUserId), applicationUserId);
        }
        public virtual async Task<ExpenseVM> CreateExpenseAsync(ExpenseCreateRequest request, Guid applicationUserId)
        {
            return await GetExpenseAsync(await _dal.CreateExpenseAsync(request, applicationUserId), applicationUserId);
        }
        public virtual async Task<ExpenseVM> UpdateExpenseAsync(Guid id, ExpenseUpdateRequest request, Guid applicationUserId)
        {
            return await GetExpenseAsync(await _dal.UpdateExpenseAsync(id, request, applicationUserId), applicationUserId);
        }

        protected virtual async Task<ExpenseVM> GetExpenseAsync(ExpenseDTO dto, Guid applicationUserId)
        {
            var tripUser = await _dal.GetTripUserAsync(dto.TripUserId, applicationUserId);
            return new ExpenseVM
            {
                DTO = dto,
                TripUsersReimburse = await GetTripUsersReimbursesAsync(new Guid[] { tripUser.TripId }, applicationUserId)
            };
        }
        protected virtual async Task<TripUserReimburseDTO[]> GetTripUsersReimbursesAsync(Guid[] tripsIds, Guid applicationUserId)
        {
            var structs = new List<TripUserExpenseTotal>();
            var dtos = new List<TripUserReimburseDTO>();
            var tripsUsersTotal = await _dal.GetTripsUsersAsync(tripsIds, applicationUserId);
            var tripsUsersExpensesTotal = await _dal.GetExpensesAsync(tripsUsersTotal.Select(x => x.Id).ToArray(), applicationUserId);

            foreach (var tripId in tripsIds)
            {
                structs.Clear();

                var tripsUsersIds = tripsUsersTotal
                    .Where(x => x.TripId == tripId)
                    .Select(x => x.Id)
                    .ToArray();

                foreach (var tripUserId in tripsUsersIds)
                {
                    structs.Add(new TripUserExpenseTotal
                    {
                        TripUserId = tripUserId,
                        ExpensesTotal = tripsUsersExpensesTotal
                            .Where(x => x.TripUserId == tripUserId)
                            .Sum(x => x.Amount)
                    });
                }

                var costPerTripUser = structs
                    .Sum(x => x.ExpensesTotal) / tripsUsersIds.Count();

                if (costPerTripUser > 0)
                {
                    var tripUsersOwing = structs
                        .Where(x => x.ExpensesTotal < costPerTripUser)
                        .ToArray();

                    var tripUsersOwed = structs
                        .Where(x => x.ExpensesTotal > costPerTripUser)
                        .ToArray();

                    foreach (var tripUserOwing in tripUsersOwing)
                    {
                        var amountToPay = costPerTripUser - tripUserOwing.ExpensesTotal;

                        foreach (var tripUserOwed in tripUsersOwed)
                        {
                            dtos.Add(new TripUserReimburseDTO
                            {
                                TripUserId = tripUserOwing.TripUserId,
                                OwingTripUserId = tripUserOwed.TripUserId,
                                Amount = ((tripUserOwed.ExpensesTotal - costPerTripUser) / tripUsersOwed.Sum(x => x.ExpensesTotal - costPerTripUser)) * amountToPay
                            });
                        }
                    }
                }
            }

            return dtos.ToArray();
        }

        public struct TripUserExpenseTotal
        {
            public Guid TripUserId { get; set; }
            public float ExpensesTotal { get; set; }
        }
    }
}
