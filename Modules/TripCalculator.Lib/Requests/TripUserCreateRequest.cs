using System;

namespace TripCalculator.Lib.Requests
{
    public class TripUserCreateRequest : BaseRequest
    {
        public Guid TripId { get; set; }
        public Guid UserId { get; set; }
    }
}
