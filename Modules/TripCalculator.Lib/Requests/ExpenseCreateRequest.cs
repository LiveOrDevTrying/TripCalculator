using System;

namespace TripCalculator.Lib.Requests
{
    public class ExpenseCreateRequest : BaseRequest
    {
        public Guid TripUserId { get; set; }
        public string Location { get; set; }
        public float Amount { get; set; }
        public DateTime TimestampTransaction { get; set; }
    }
}
