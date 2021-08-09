using TripCalculator.Lib.DTOs;

namespace TripCalculator.Lib.Requests
{
    public class Payload
    {
        public UserDTO[] Users { get; set; }
        public TripDTO[] Trips { get; set; }
        public TripUserDTO[] TripsUsers { get; set; }
    }
}
