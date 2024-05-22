namespace UserApplication.Dtos.Claims
{
    public class ReadClaimDto
    {
        public string Email { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
    }
}
