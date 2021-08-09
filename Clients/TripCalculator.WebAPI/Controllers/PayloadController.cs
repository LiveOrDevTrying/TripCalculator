using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using TripCalculator.DAL;
using TripCalculator.Lib.Requests;

namespace TripCalculator.WebAPI.Controllers
{
    public class PayloadController : BaseController<PayloadController>
    {
        public PayloadController(ILogger<PayloadController> logger,
            IDAL dal,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris) 
            : base(logger, dal, clientFactory, uris)
        {
        }

        [HttpGet("/Payload")]
        [ProducesResponseType(typeof(Payload), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Payload), StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> GetPayloadAsync()
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var payload = await _dal.GetPayloadAsync(applicationUser.Id);

                if (payload != null)
                {
                    return Ok(payload);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error - GetPayloadAsync in Payload controller");
            }

            return new StatusCodeResult(500);
        }
    }
}
