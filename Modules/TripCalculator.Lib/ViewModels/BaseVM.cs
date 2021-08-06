using System;
using TripCalculator.Lib.DTOs;

namespace TripCalculator.Lib.ViewModels
{
    public abstract class BaseVM<T> where T : BaseDTO
    {
        public T[] Data { get; set; } = Array.Empty<T>();
    }
}
