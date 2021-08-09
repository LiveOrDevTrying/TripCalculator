using System;

namespace TripCalculator.Lib.DTOs
{
    public class TripUserDTO : BaseDTO
    {
        public Guid TripId { get; set; }
        public Guid UserId { get; set; }
    }
}
