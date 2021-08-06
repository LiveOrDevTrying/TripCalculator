using System;

namespace TripCalculator.Lib.DTOs
{
    public class ExpenseDTO : BaseDTO
    {
        public string Location { get; set; }
        public float Amount { get; set; }
        public DateTime TimestampTransaction { get; set; }
    }
}
