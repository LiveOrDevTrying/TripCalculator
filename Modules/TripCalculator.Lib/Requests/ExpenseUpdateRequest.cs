using System;

namespace TripCalculator.Lib.Requests
{
    public class ExpenseUpdateRequest : BaseUpdateRequest
    {
        public string Location { get; set; }
        public float Amount { get; set; }
        public DateTime TimestampTransaction { get; set; }
    }
}
