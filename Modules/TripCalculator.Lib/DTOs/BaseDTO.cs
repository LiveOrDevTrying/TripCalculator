using System;

namespace TripCalculator.Lib.DTOs
{
    public abstract class BaseDTO
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public DateTime Timestamp { get; set; }
    }
}
