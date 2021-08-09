using System;
using System.Collections.Generic;

namespace TripCalculator.Domain.Lib
{
    public class Trip : BaseEntity
    {
        public Guid ApplicationUserId { get; set; }

        public string TripName { get; set; }
        public DateTime? TripStartDate { get; set; }
        public DateTime? TripEndDate { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<TripUser> TripUsers { get; set; } =
            new List<TripUser>();
    }
}
