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
    public class UsersController : BaseController<UsersController>
    {
        public UsersController(
            ILogger<UsersController> logger,
            IDAL dal,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris)
            : base(logger, dal, clientFactory, uris)
        {
        }

        /// <summary>
        /// Get Users registered to the Application User
        /// </summary>
        /// <returns>An array of UserDTOs</returns>
        [HttpGet("/Users")]
        [ProducesResponseType(typeof(UserDTO[]), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUsersAsync()
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var users = await _dal.GetUsersAsync(applicationUser.Id);

                if (users != null)
                {
                    _logger.LogInformation("OK - GetUsersAsync in UsersController");
                    return Ok(users);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetUsersAsync in UsersController");
            }
            
            _logger.LogWarning("Internal Server Error - GetUsersAsync in UsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Gets a User registered to the Application User
        /// </summary>
        /// <param name="id">Id of the requested User</param>
        /// <returns>A User ViewModel</returns>
        [HttpGet("/Users/{id}")]
        [ProducesResponseType(typeof(UserVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(int), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var user = await _dal.GetUserAsync(id, applicationUser.Id);

                if (user != null)
                {
                    _logger.LogInformation("OK - GetUserAsync in UsersController");
                    return Ok(user);
                }

                _logger.LogInformation("Bad Request - GetUserAsync in UsersController");
                return BadRequest(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetUserAsync in UsersController");
            }

            _logger.LogWarning("Internal Server Error - GetUserAsync in UsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Creates a new User registered to the Application User
        /// </summary>
        /// <param name="request">The User create request</param>
        /// <returns>The created UserDTO</returns>
        [HttpPost("/Users")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(UserCreateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostUserAsync([Required, FromBody] UserCreateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var user = await _dal.CreateUserAsync(request, applicationUser.Id);

                if (user != null)
                {
                    _logger.LogInformation("Created - PostUserAsync in UsersController");
                    return Created("/Users", user);
                }

                _logger.LogInformation("Bad Request - PostUserAsync in UsersController");
                return BadRequest(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PostUserAsync in UsersController");
            }

            _logger.LogWarning("Internal Server Error - PostUserAsync in UsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Updates a User registered to an Application User
        /// </summary>
        /// <param name="id">The Id of the User to update</param>
        /// <param name="request">The User update request</param>
        /// <returns>A UserDTO</returns>
        [HttpPut("/Users/{id}")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(UserUpdateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutUserAsync([Required] Guid id, [Required, FromBody] UserUpdateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var user = await _dal.UpdateUserAsync(id, request, applicationUser.Id);

                if (user != null)
                {
                    _logger.LogInformation("OK - PutUserAsync in UsersController");
                    return Ok(user);
                }

                _logger.LogInformation("Bad Request - PutUserAsync in UsersController");
                return BadRequest(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PutUserAsync in UsersController");
            }

            _logger.LogWarning("Internal Server Error - PutUserAsync in UsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Deletes a User registered to an Application User
        /// </summary>
        /// <param name="id">The Id of the User to delete</param>
        /// <returns>A bool if the User was successfully deleted</returns>
        [HttpDelete("/Users/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteUserAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                if (await _dal.DeleteUserAsync(id, applicationUser.Id))
                {
                    _logger.LogInformation("NoContent - DeleteUserAsync in UsersController");
                    return NoContent();
                }
                else
                {
                    _logger.LogInformation("Bad Request - DeleteUserAsync in UsersController");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - DeleteUserAsync in UsersController");
            }

            _logger.LogWarning("Internal Server Error - DeleteUserAsync in UsersController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
