using System.Security.Claims;
using UserApplication.Dtos.Claims;

namespace UserApplication.Mappers
{
    public static class ClaimsMapper
    {
        public static ReadClaimDto FromClaimsToReadClaims(this Claim claim)
        {
            return new ReadClaimDto
            {
                Email = claim.Subject.Name,
                Issuer = claim.Issuer,
                Type = claim.Type,
                Value = claim.Value
            };
        }

        public static Claim FromDeleteClaimToClaim(this DeleteClaimDto claim)
        {
            return new Claim(claim.ClaimType, claim.ClaimValue);
        }
    }
}
