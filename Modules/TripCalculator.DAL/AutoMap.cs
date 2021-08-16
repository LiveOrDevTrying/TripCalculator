using AutoMapper;
using TripCalculator.Domain.Lib;
using TripCalculator.Lib.DTOs;
using TripCalculator.Lib.Requests;
using TripCalculator.Lib.ViewModels;

namespace TripCalculator.DAL
{
    public static class AutoMap
    {
        public static IMapper CreateMapper()
        {
            return new MapperConfiguration(c =>
            {
                c.CreateMap<PayloadDTO, PayloadVM>().ReverseMap();

                c.CreateMap<ApplicationUserCreateRequest, ApplicationUser>().ReverseMap();
                c.CreateMap<ApplicationUserUpdateRequest, ApplicationUser>().ReverseMap();
                c.CreateMap<ApplicationUser, ApplicationUserDTO>().ReverseMap();

                c.CreateMap<ExpenseCreateRequest, Expense>().ReverseMap();
                c.CreateMap<ExpenseUpdateRequest, Expense>().ReverseMap();
                c.CreateMap<Expense, ExpenseDTO>().ReverseMap();

                c.CreateMap<TripCreateRequest, Trip>().ReverseMap();
                c.CreateMap<TripUpdateRequest, Trip>().ReverseMap();
                c.CreateMap<Trip, TripDTO>().ReverseMap();

                c.CreateMap<TripUser, TripUserDTO>().ReverseMap();

                c.CreateMap<UserCreateRequest, User>().ReverseMap();
                c.CreateMap<ApplicationUserCreateRequest, User>().ReverseMap();
                c.CreateMap<UserUpdateRequest, User>().ReverseMap();
                c.CreateMap<User, UserDTO>().ReverseMap();
            }).CreateMapper();
        }
    }
}
