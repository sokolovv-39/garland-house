namespace HouseGarland.API.Configurations
{
    public class JwtConfiguration
    {
        public string Key { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }
}
