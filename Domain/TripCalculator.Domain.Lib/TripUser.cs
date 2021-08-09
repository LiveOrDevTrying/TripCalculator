using System;
using System.Collections.Generic;
using System.Linq;

namespace TripCalculator.Domain.Lib
{
    public class TripUser : BaseEntity
    {
        public Guid TripId { get; set; }
        public Guid UserId { get; set; }

        public Trip Trip { get; set; }
        public User User { get; set; }

        public ICollection<Expense> Expenses { get; set; } =
            new List<Expense>();

        public virtual float ExpensesTotal()
        {
            return Expenses.Sum(x => x.Amount);
        }
    }
}
