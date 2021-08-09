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
    public class ExpensesController : BaseController<ExpensesController>
    {
        public ExpensesController(
            ILogger<ExpensesController> logger,
            IDAL dal,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris)
            : base(logger, dal, clientFactory, uris)
        {
        }

        /// <summary>
        /// Get Expenses registered to a TripUserId
        /// </summary>
        /// <returns>An array of ExpenseDTOs</returns>
        [HttpGet("/Expenses/{id}")]
        [ProducesResponseType(typeof(ExpenseDTO[]), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetExpensesAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var expenses = await _dal.GetExpensesAsync(id, applicationUser.Id);

                if (expenses != null)
                {
                    _logger.LogInformation("OK - GetExpensesAsync in ExpensesController");
                    return Ok(expenses);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetExpensesAsync in ExpensesController");
            }
            
            _logger.LogWarning("Internal Server Error - GetExpensesAsync in ExpensesController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Gets an Expense registered to an a Trip User.
        /// </summary>
        /// <param name="id">Id of the requested Expense</param>
        /// <returns>A Expense ViewModel</returns>
        [HttpGet("/Expense/{id}")]
        [ProducesResponseType(typeof(ExpenseVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(int), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetExpenseAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var expense = await _dal.GetExpenseAsync(id, applicationUser.Id);

                if (expense != null)
                {
                    _logger.LogInformation("OK - GetExpenseAsync in ExpensesController");
                    return Ok(expense);
                }

                _logger.LogInformation("Bad Request - GetExpenseAsync in ExpensesController");
                return BadRequest(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - GetExpenseAsync in ExpensesController");
            }

            _logger.LogWarning("Internal Server Error - GetExpenseAsync in ExpensesController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Creates a new Expense registered to the Trip User
        /// </summary>
        /// <param name="request">The Expense create request</param>
        /// <returns>The created ExpenseDTO</returns>
        [HttpPost("/Expenses")]
        [ProducesResponseType(typeof(ExpenseVM), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ExpenseCreateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PostExpenseAsync([Required, FromBody] ExpenseCreateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var expense = await _dal.CreateExpenseAsync(request, applicationUser.Id);

                if (expense != null)
                {
                    _logger.LogInformation("Created - PostExpenseAsync in ExpensesController");
                    return Created("/Expenses", expense);
                }

                _logger.LogInformation("Bad Request - PostExpenseAsync in ExpensesController");
                return BadRequest(expense);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PostExpenseAsync in ExpensesController");
            }

            _logger.LogWarning("Internal Server Error - PostExpenseAsync in ExpensesController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Updates a Expense registered to a Trip User
        /// </summary>
        /// <param name="id">The Id of the Expense to update</param>
        /// <param name="request">The Expense update request</param>
        /// <returns>A ExpenseDTO</returns>
        [HttpPut("/Expenses/{id}")]
        [ProducesResponseType(typeof(ExpenseVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ExpenseUpdateRequest), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PutExpenseAsync([Required] Guid id, [Required, FromBody] ExpenseUpdateRequest request)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var expense = await _dal.UpdateExpenseAsync(id, request, applicationUser.Id);

                if (expense != null)
                {
                    _logger.LogInformation("OK - PutExpenseAsync in ExpensesController");
                    return Ok(expense);
                }

                _logger.LogInformation("Bad Request - PutExpenseAsync in ExpensesController");
                return BadRequest(expense);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - PutExpenseAsync in ExpensesController");
            }

            _logger.LogWarning("Internal Server Error - PutExpenseAsync in ExpensesController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }

        /// <summary>
        /// Deletes an Expense registered to a Trip User
        /// </summary>
        /// <param name="id">The Id of the Expense to delete</param>
        /// <returns>A bool if the Expense was successfully deleted</returns>
        [HttpDelete("/Expenses/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(Guid), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteExpenseAsync([Required] Guid id)
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                if (await _dal.DeleteExpenseAsync(id, applicationUser.Id))
                {
                    _logger.LogInformation("NoContent - DeleteExpenseAsync in ExpensesController");
                    return NoContent();
                }
                else
                {
                    _logger.LogInformation("Bad Request - DeleteExpenseAsync in ExpensesController");
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception - DeleteExpenseAsync in ExpensesController");
            }

            _logger.LogWarning("Internal Server Error - DeleteExpenseAsync in ExpensesController");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
    }
}
