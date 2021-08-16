using System;
using System.Threading.Tasks;
using TripCalculator.Lib.Requests;
using TripCalculator.Lib.ViewModels;

namespace TripCalculator.BLL
{
    public interface IBLL
    {
        Task<PayloadVM> GetPayloadAsync(Guid applicationUserId);

        Task<ExpenseVM> GetExpenseAsync(Guid expenseId, Guid applicationUserId);
        Task<ExpenseVM> CreateExpenseAsync(ExpenseCreateRequest request, Guid applicationUserId);
        Task<ExpenseVM> UpdateExpenseAsync(Guid id, ExpenseUpdateRequest request, Guid applicationUserId);
    }
}
