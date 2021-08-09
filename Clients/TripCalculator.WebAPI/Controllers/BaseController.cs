using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TripCalculator.DAL;
using TripCalculator.Lib.DTOs;
using TripCalculator.Lib.Requests;

namespace TripCalculator.WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T> : ControllerBase where T : ControllerBase
    {
        protected readonly ILogger<T> _logger;
        protected readonly IDAL _dal;
        protected readonly IHttpClientFactory _clientFactory;
        protected readonly URIs _uris;

        public BaseController(ILogger<T> logger,
            IDAL dal,
            IHttpClientFactory clientFactory,
            IOptions<URIs> uris)
        {
            _logger = logger;
            _dal = dal;
            _clientFactory = clientFactory;
            _uris = uris.Value;
        }

        protected async Task<ApplicationUserDTO> GetApplicationUserAsync()
        {
            var applicationUser = await _dal.GetApplicationUserAsync("828AE451-4695-478D-99EB-41BCD5A97C45");

            if (applicationUser == null)
            {
                applicationUser = await _dal.CreateApplicationUserAsync(new ApplicationUserCreateRequest
                {
                    Username = "Rob"
                }, "828AE451-4695-478D-99EB-41BCD5A97C45");
            }

            return applicationUser;

            //var aspNetUserId = User.Claims.First(s => s.Type == "sub").Value;

            //var applicationUser = await _dal.GetApplicationUserAsync(aspNetUserId);

            //if (applicationUser == null)
            //{
            //    var client = _clientFactory.CreateClient();
            //    var accessToken = Request.Headers.First(s => s.Key == "Authorization").Value[0].Split(' ')[1];

            //    var disco = await client.GetDiscoveryDocumentAsync(_uris.IdentityServerURI);
            //    var response = await client.GetUserInfoAsync(new UserInfoRequest
            //    {
            //        Address = disco.UserInfoEndpoint,
            //        Token = accessToken
            //    });
            //}
        }
    }
    //using (var context = new ApplicationDbContext())
    //{
    //    var aspNetUserId = User.Claims.First(s => s.Type == "sub").Value;

    //    var applicationUser = await context.ApplicationUsers
    //        .FirstOrDefaultAsync(s => s.AspNetUserId == aspNetUserId);

    //    if (applicationUser == null)
    //    {
    //        var accessToken = Request.Headers.First(s => s.Key == "Authorization").Value[0].Split(' ')[1];

    //        var disco = await _httpClient.GetDiscoveryDocumentAsync(Globals.IDENTITY_SERVER_URL);
    //        var response = await _httpClient.GetUserInfoAsync(new UserInfoRequest
    //        {
    //            Address = disco.UserInfoEndpoint,
    //            Token = accessToken
    //        });

    //        applicationUser = new ApplicationUser
    //        {
    //            AspNetUserId = aspNetUserId,
    //            UserName = response.Claims.First(s => s.Type == "preferred_username").Value
    //        };

    //        context.ApplicationUsers.Add(applicationUser);

    //        await context.SaveChangesAsync();
    //    }

    //    return _mapper.Map<ApplicationUserVM>(applicationUser);
    //}
}