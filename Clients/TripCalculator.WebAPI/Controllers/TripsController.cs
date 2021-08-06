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
    public class TripsController : BaseController<TripsController>
    {
        public TripsController(
            ILogger<TripsController> logger,
            IDAL dal,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris)
            : base(logger, dal, clientFactory, uris)
        {
        }

        /// <summary>
        /// Get Trips registered to the Application User
        /// </summary>
        /// <returns>An array of TripDTOs</returns>
        [HttpGet("/Trips")]
        [ProducesResponseType(typeof(TripDTO[]), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTripsAsync()
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var trips = await _dal.GetTripsAsync(applicationUser.Id);

                if (trips != null)
                {
                    _logger.LogInformation("OK - GetTripsAsync in TripsController");
                    return Ok(trips);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripsAsync in TripsController");
            }
            
            _logger.LogWarning("Internal Server Error - GetTripsAsync in TripsController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Gets a Trip registered to the Application User
        /// </summary>
        /// <param name="id">Id of the requested Trip</param>
        /// <returns>A Trip ViewModel</returns>
        [HttpGet("/Trips/{id}")]
        [ProducesResponseType(typeof(TripVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(int), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTripAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var trip = await _dal.GetTripAsync(id, applicationUser.Id);

                if (trip != null)
                {
                    _logger.LogInformation("OK - GetTripAsync in TripsController");
                    return Ok(trip);
                }

                _logger.LogInformation("Bad Request - GetTripAsync in TripsController");
                return BadRequest(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetTripAsync in TripsController");
            }

            _logger.LogWarning("Internal Server Error - GetTripAsync in TripsController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Creates a new Trip registered to the Application User
        /// </summary>
        /// <param name="request">The Trip create request</param>
        /// <returns>The created TripDTO</returns>
        [HttpPost("/Trips")]
        [ProducesResponseType(typeof(TripDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(TripCreateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostTripAsync([Required, FromBody] TripCreateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var trip = await _dal.CreateTripAsync(request, applicationUser.Id);

                if (trip != null)
                {
                    _logger.LogInformation("Created - PostTripAsync in TripsController");
                    return Created("/Trips", trip);
                }

                _logger.LogInformation("Bad Request - PostTripAsync in TripsController");
                return BadRequest(trip);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PostTripAsync in TripsController");
            }

            _logger.LogWarning("Internal Server Error - PostTripAsync in TripsController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Updates a Trip registered to an Application User
        /// </summary>
        /// <param name="id">The Id of the Trip to update</param>
        /// <param name="request">The Trip update request</param>
        /// <returns>A TripDTO</returns>
        [HttpPut("/Trips/{id}")]
        [ProducesResponseType(typeof(TripDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(TripUpdateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutTripAsync([Required] Guid id, [Required, FromBody] TripUpdateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var trip = await _dal.UpdateTripAsync(id, request, applicationUser.Id);

                if (trip != null)
                {
                    _logger.LogInformation("OK - PutTripAsync in TripsController");
                    return Ok(trip);
                }

                _logger.LogInformation("Bad Request - PutTripAsync in TripsController");
                return BadRequest(trip);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PutTripAsync in TripsController");
            }

            _logger.LogWarning("Internal Server Error - PutTripAsync in TripsController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Deletes a Trip registered to an Application User
        /// </summary>
        /// <param name="id">The Id of the Trip to delete</param>
        /// <returns>A bool if the Trip was successfully deleted</returns>
        [HttpDelete("/Trips/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteTripAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                if (await _dal.DeleteTripAsync(id, applicationUser.Id))
                {
                    _logger.LogInformation("NoContent - DeleteTripAsync in TripsController");
                    return NoContent();
                }
                else
                {
                    _logger.LogInformation("Bad Request - DeleteTripAsync in TripsController");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - DeleteTripAsync in TripsController");
            }

            _logger.LogWarning("Internal Server Error - DeleteTripAsync in TripsController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
