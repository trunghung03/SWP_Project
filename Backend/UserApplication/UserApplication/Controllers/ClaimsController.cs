using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UserApplication.Dtos.Claims;
using UserApplication.Mappers;
using UserApplication.Model;

namespace UserApplication.Controllers
{
    [ApiController]
    [Route("api/claims")]
    public class ClaimsController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public ClaimsController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        [Authorize]
        [HttpGet]
        public IActionResult GetAll() 
        {
            var claimsDto = User?.Claims.OrderBy(x => x.Type).Select(x => x.FromClaimsToReadClaims());
            return Ok(claimsDto);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateClaimDto claimDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            // Get user
            var username = User.Identity.Name;
            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null) { return BadRequest("User not found!"); }

            Claim claim = new(claimDto.ClaimType, claimDto.ClaimValue, ClaimValueTypes.String, null, null, User.Identities.First());
            IdentityResult result = await _userManager.AddClaimAsync(appUser, claim);

            if (result.Succeeded) return Ok(claim.FromClaimsToReadClaims());
            return BadRequest("Unable to create claim!");
        }

        [Authorize]
        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteClaimDto claimDto)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            // Get user
            var username = claimDto.Email;
            var appUser = await _userManager.FindByNameAsync(username);
            if (appUser == null) { return BadRequest("User not found!"); }

            Claim claim = User.Claims.FirstOrDefault(x => x.Type == claimDto.ClaimType && x.Value == claimDto.ClaimValue);
            if (claim == null) return NotFound("Claim not found!");

            IdentityResult result = await _userManager.RemoveClaimAsync(appUser, claim);

            if (result.Succeeded) return Ok(claim.FromClaimsToReadClaims());
            return BadRequest("Unable to delete claim!");
        }
    }
}
