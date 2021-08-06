using System;
using System.Threading.Tasks;
using TripCalculator.Domain.CodeFirst;
using TripCalculator.Lib.DTOs;
using TripCalculator.Lib.Requests;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using TripCalculator.Lib.ViewModels;
using TripCalculator.Domain.Lib;

namespace TripCalculator.DAL
{
    public class DAL : IDAL
    {
        protected readonly ApplicationDbContext _context;
        protected readonly IMapper _mapper;
        protected readonly ILogger<DAL> _logger;

        public DAL(ApplicationDbContext context,
            IMapper mapper,
            ILogger<DAL> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public virtual async Task<ApplicationUserDTO> GetApplicationUserAsync(string aspNetUserId)
        {
            try
            {
                var entity = await _context.ApplicationUsers
                    .FirstOrDefaultAsync(x => x.AspNetUserId == aspNetUserId);

                if (entity != null)
                {
                    return _mapper.Map<ApplicationUserDTO>(entity);
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error - GetApplicationUserAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<ApplicationUserDTO> CreateApplicationUserAsync(ApplicationUserCreateRequest request, string aspNetUserId)
        {
            try
            {
                var entity = _mapper.Map<ApplicationUser>(request);
                entity.AspNetUserId = aspNetUserId;

                await _context.ApplicationUsers.AddAsync(entity);

                var user = _mapper.Map<User>(request);
                user.ApplicationUser = entity;

                await _context.Users.AddAsync(user);

                return await _context.SaveChangesAsync() > 0 ? _mapper.Map<ApplicationUserDTO>(entity) : null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - CreateApplicationUserAsync in DAL");
                throw ex;
            }
        }

        public virtual async Task<Payload> GetPayloadAsync(Guid applicationUserId)
        {
            try
            {
                return new Payload
                {
                    Users = await GetUsersAsync(applicationUserId)
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetPayloadAsync in DAL");
                throw ex;
            }
        }

        public virtual async Task<UserDTO[]> GetUsersAsync(Guid applicationUserId)
        {
            try
            {
                var entities = await _context.Users
                    .AsNoTracking()
                    .Where(x => x.ApplicationUserId == applicationUserId && x.Active)
                    .ToListAsync();

                var dtos = new List<UserDTO>();

                entities.ForEach(x => dtos.Add(_mapper.Map<UserDTO>(x)));

                return dtos.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetUsersAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<UserVM> GetUserAsync(Guid userId, Guid applicationUserId)
        {
            try
            {
                var entity = await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == userId && 
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                return new UserVM
                {
                    Data = new UserDTO[]
                    {
                         _mapper.Map<UserDTO>(entity)
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetUsersAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<UserDTO> CreateUserAsync(UserCreateRequest request, Guid applicationUserId)
        {
            try
            {
                var entity = _mapper.Map<User>(request);
                entity.ApplicationUserId = applicationUserId;

                await _context.Users.AddAsync(entity);

                if (await _context.SaveChangesAsync() > 0)
                {
                    return _mapper.Map<UserDTO>(entity);
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - CreateUserAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<UserDTO> UpdateUserAsync(Guid id, UserUpdateRequest request, Guid applicationUserId)
        {
            try
            {
                var entity = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == request.Id &&
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                if (entity != null)
                {
                    entity = _mapper.Map(request, entity);
                    _context.Entry(entity).State = EntityState.Modified;

                    if (await _context.SaveChangesAsync() > 0)
                    {
                        return _mapper.Map<UserDTO>(entity);
                    }
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - UpdateUserAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<bool> DeleteUserAsync(Guid id, Guid applicationUserId)
        {
            try
            {
                var entity = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == id &&
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                if (entity != null)
                {
                    entity.Active = false;
                    _context.Entry(entity).State = EntityState.Modified;

                    return await _context.SaveChangesAsync() > 0;
                }

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - DeleteUserAsync in DAL");
                throw ex;
            }
        }

        public virtual async Task<TripDTO[]> GetTripsAsync(Guid applicationUserId)
        {
            try
            {
                var entities = await _context.Trips
                    .AsNoTracking()
                    .Where(x => x.ApplicationUserId == applicationUserId && x.Active)
                    .ToListAsync();

                var dtos = new List<TripDTO>();

                entities.ForEach(x => dtos.Add(_mapper.Map<TripDTO>(x)));

                return dtos.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripsAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<TripVM> GetTripAsync(Guid tripId, Guid applicationUserId)
        {
            try
            {
                var entity = await _context.Trips
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == tripId &&
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                return new TripVM
                {
                    Data = new TripDTO[]
                    {
                         _mapper.Map<TripDTO>(entity)
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripsAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<TripDTO> CreateTripAsync(TripCreateRequest request, Guid applicationUserId)
        {
            try
            {
                var entity = _mapper.Map<Trip>(request);
                entity.ApplicationUserId = applicationUserId;

                await _context.Trips.AddAsync(entity);

                if (await _context.SaveChangesAsync() > 0)
                {
                    return _mapper.Map<TripDTO>(entity);
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - CreateTripAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<TripDTO> UpdateTripAsync(Guid id, TripUpdateRequest request, Guid applicationUserId)
        {
            try
            {
                var entity = await _context.Trips
                    .FirstOrDefaultAsync(x => x.Id == request.Id &&
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                if (entity != null)
                {
                    entity = _mapper.Map(request, entity);
                    _context.Entry(entity).State = EntityState.Modified;

                    if (await _context.SaveChangesAsync() > 0)
                    {
                        return _mapper.Map<TripDTO>(entity);
                    }
                }

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - UpdateTripAsync in DAL");
                throw ex;
            }
        }
        public virtual async Task<bool> DeleteTripAsync(Guid id, Guid applicationUserId)
        {
            try
            {
                var entity = await _context.Trips
                    .FirstOrDefaultAsync(x => x.Id == id &&
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                if (entity != null)
                {
                    entity.Active = false;
                    _context.Entry(entity).State = EntityState.Modified;

                    return await _context.SaveChangesAsync() > 0;
                }

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - DeleteTripAsync in DAL");
                throw ex;
            }
        }

        public virtual async Task<TripUserDTO[]> GetTripsUsersAsync(Guid tripId, Guid applicationUserId)
        {
            try
            {
                var tripEntity = await _context.Trips
                    .FirstOrDefaultAsync(x => x.Id == tripId &&
                        x.ApplicationUserId == applicationUserId &&
                        x.Active);

                var entities = await _context.TripsUsers
                    .AsNoTracking()
                    .Where(x => x.TripId == tripEntity.Id && x.Active)
                    .ToListAsync();

                var dtos = new List<TripDTO>();

                entities.ForEach(x => dtos.Add(_mapper.Map<TripDTO>(x)));

                return dtos.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripsAsync in DAL");
                throw ex;
            }
        }
        public Task<TripDTO> CreateTripUserAsync(TripUserCreateRequest request, Guid applicationTripId)
        {
            throw new NotImplementedException();
        }
        public Task<bool> DeleteTripUserAsync(Guid id, Guid applicationTripId)
        {
            throw new NotImplementedException();
        }

        public Task<TripUserVM> GetTripUserAsync(Guid tripUserId, Guid applicationUserId)
        {
            throw new NotImplementedException();
        }
    }
}
