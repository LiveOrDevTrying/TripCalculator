﻿using System;

namespace TripCalculator.Lib.Requests
{
    public class TripCreateRequest : BaseRequest
    {
        public string TripName { get; set; }
        public DateTime? TripStartDate { get; set; }
        public DateTime? TripEndDate { get; set; }
        public Guid[] UserIds { get; set; }
    }
}
