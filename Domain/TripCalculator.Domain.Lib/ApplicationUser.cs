using System;
using System.Collections.Generic;

namespace TripCalculator.Domain.Lib
{
    public class ApplicationUser : BaseEntity
    {
        public Guid UserId { get; set; }

        public string AspNetUserId { get; set; }
        public string Username { get; set; }

        public User User { get; set; }

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Trip> Trips { get; set; } = new List<Trip>();
    }
}
