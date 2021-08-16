using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using TripCalculator.BLL;
using TripCalculator.DAL;
using TripCalculator.Lib.Requests;
using TripCalculator.Lib.ViewModels;

namespace TripCalculator.WebAPI.Controllers
{
    public class PayloadController : BaseController<PayloadController>
    {
        protected readonly IBLL _bll;

        public PayloadController(ILogger<PayloadController> logger,
            IDAL dal,
            IBLL bll,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris) 
            : base(logger, dal, clientFactory, uris)
        {
            _bll = bll;
        }

        [HttpGet("/Payload")]
        [ProducesResponseType(typeof(PayloadVM), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(PayloadVM), StatusCodes.Status500InternalServerError)]
        public virtual async Task<IActionResult> GetPayloadAsync()
        {
            try
            {
                var applicationUser = await GetApplicationUserAsync();

                var payload = await _bll.GetPayloadAsync(applicationUser.Id);

                if (payload != null)
                {
                    _logger.LogInformation("OK - GetPayloadAsync in Payload controller");
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
