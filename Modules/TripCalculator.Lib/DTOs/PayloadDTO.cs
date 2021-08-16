using TripCalculator.Lib.DTOs;

namespace TripCalculator.Lib.DTOs
{
    public class PayloadDTO
    {
        public UserDTO[] Users { get; set; }
        public TripDTO[] Trips { get; set; }
        public TripUserDTO[] TripsUsers { get; set; }
        public ExpenseDTO[] Expenses { get; set; }
    }
}
