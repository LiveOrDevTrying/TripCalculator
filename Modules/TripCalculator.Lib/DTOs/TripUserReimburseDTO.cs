using System;

namespace TripCalculator.Lib.DTOs
{
    public class TripUserReimburseDTO : BaseDTO
    {
        public Guid TripUserId { get; set; }
        public Guid OwingTripUserId { get; set; }
        public float Amount { get; set; }
    }
}
