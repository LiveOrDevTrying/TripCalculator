using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Threading.Tasks;
using TripCalculator.DAL;
using TripCalculator.Lib.DTOs;
using TripCalculator.Lib.Requests;
using TripCalculator.Lib.ViewModels;

namespace TripCalculator.WebAPI.Controllers
{
    public class TripsUsersController : BaseController<TripsUsersController>
    {
        public TripsUsersController(
            ILogger<TripsUsersController> logger,
            IDAL dal,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris)
            : base(logger, dal, clientFactory, uris)
        {
        }

        /// <summary>
        /// Gets the Trips Users registered to the requested Trip
        /// </summary>
        /// <param name="id">Id of the requested Trip</param>
        /// <returns>An array of TripUserDTOs</returns>
        [HttpGet("/TripsUsers/{id}")]
        [ProducesResponseType(typeof(TripVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTripsUsersAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var tripsUsers = await _dal.GetTripUsersAsync(id, applicationUser.Id);

                if (tripsUsers != null)
                {
                    _logger.LogInformation("OK - GetTripsUsersAsync in TripsUsersController");
                    return Ok(tripsUsers);
                }

                _logger.LogInformation("Bad Request - GetTripsUsersAsync in TripsUsersController");
                return BadRequest(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripsUsersAsync in TripsUsersController");
            }

            _logger.LogWarning("Internal Server Error - GetTripsUsersAsync in TripsUsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }


        /// <summary>
        /// Gets a Trip User registered to a registered Trip
        /// </summary>
        /// <param name="id">Id of the requested Trip User</param>
        /// <returns>A Trip User ViewModel</returns>
        [HttpGet("/TripUsers/{id}")]
        [ProducesResponseType(typeof(TripUserVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTripUserAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var tripUser = await _dal.GetTripUserAsync(id, applicationUser.Id);

                if (tripUser != null)
                {
                    _logger.LogInformation("OK - GetTripUserAsync in TripUsersController");
                    return Ok(tripUser);
                }

                _logger.LogInformation("Bad Request - GetTripUserAsync in TripUsersController");
                return BadRequest(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripUserAsync in TripUsersController");
            }

            _logger.LogWarning("Internal Server Error - GetTripUserAsync in TripUsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Creates a new Trip User registered to a Trip
        /// </summary>
        /// <param name="request">The Trip User create request</param>
        /// <returns>The created TripUserDTO</returns>
        [HttpPost("/TripsUsers")]
        [ProducesResponseType(typeof(TripUserDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(TripUserCreateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostTripUserAsync([Required, FromBody] TripUserCreateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var tripUser = await _dal.CreateTripUserAsync(request, applicationUser.Id);

                if (tripUser != null)
                {
                    _logger.LogInformation("Created - PostTripUserAsync in TripsUsersController");
                    return Created("/TripsUsers", tripUser);
                }

                _logger.LogInformation("Bad Request - PostTripUserAsync in TripsUsersController");
                return BadRequest(tripUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PostTripUserAsync in TripsUsersController");
            }

            _logger.LogWarning("Internal Server Error - PostTripUserAsync in TripsUsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Deletes a Trip User registered to a Trip
        /// </summary>
        /// <param name="id">The Id of the Trip User to delete</param>
        /// <returns>A bool if the Trip User was successfully deleted</returns>
        [HttpDelete("/TripsUsers/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteTripUserAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                if (await _dal.DeleteTripUserAsync(id, applicationUser.Id))
                {
                    _logger.LogInformation("NoContent - DeleteTripUserAsync in TripsUsersController");
                    return NoContent();
                }
                else
                {
                    _logger.LogInformation("Bad Request - DeleteTripUserAsync in TripsUsersController");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - DeleteTripUserAsync in TripsUsersController");
            }

            _logger.LogWarning("Internal Server Error - DeleteTripUserAsync in TripsUsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
