using System;

namespace TripCalculator.Lib.Requests
{
    public abstract class BaseUpdateRequest : BaseRequest
    {
        public Guid Id { get; set; }
    }
}
