using TripCalculator.Lib.DTOs;

namespace TripCalculator.Lib.ViewModels
{
    public class TripVM : BaseVM<TripDTO>
    {
        public TripUserDTO[] TripsUsers { get; set; }
    }
}
