using TripCalculator.Lib.DTOs;

namespace TripCalculator.Lib.ViewModels
{
    public class PayloadVM : PayloadDTO
    {
        public TripUserReimburseDTO[] TripUsersReimburse { get; set; }
    }
}
