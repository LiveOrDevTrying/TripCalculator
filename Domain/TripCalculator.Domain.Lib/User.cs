using System;
using System.Collections.Generic;

namespace TripCalculator.Domain.Lib
{
    public class User : BaseEntity
    {
        public Guid? ApplicationUserId { get; set; }

        public string Username { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public ICollection<TripUser> TripUsers { get; set; } =
            new List<TripUser>();
    }
}
