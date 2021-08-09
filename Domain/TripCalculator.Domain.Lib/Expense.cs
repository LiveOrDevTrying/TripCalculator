using System;

namespace TripCalculator.Domain.Lib
{
    public class Expense : BaseEntity
    {
        public Guid TripUserId { get; set; }

        public string Location { get; set; }
        public float Amount { get; set; }
        public DateTime TimestampTransaction { get; set; }

        public TripUser TripUser { get; set; }

        public virtual bool IsValid()
        {
            return Amount > 0;
        }
    }
}
