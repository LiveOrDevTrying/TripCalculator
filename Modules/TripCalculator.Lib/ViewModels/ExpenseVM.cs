﻿using TripCalculator.Lib.DTOs;

namespace TripCalculator.Lib.ViewModels
{
    public class ExpenseVM : BaseVM<ExpenseDTO>
    {
        public TripUserReimburseDTO[] TripUsersReimburse { get; set; }
    }
}
