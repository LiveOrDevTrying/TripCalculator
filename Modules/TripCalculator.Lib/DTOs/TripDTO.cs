using System;

namespace TripCalculator.Lib.DTOs
{
    public class TripDTO : BaseDTO
    {
        public string TripName { get; set; }
        public DateTime? TripStartDate { get; set; }
        public DateTime? TripEndDate { get; set; }
    }
}
