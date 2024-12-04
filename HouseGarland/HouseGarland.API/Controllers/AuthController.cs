using AutoMapper;
using GarlandHouse.API.DTO;
using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using HouseGarland.API.Configurations;
using HouseGarland.API.DTO;
using HouseGarland.Shared;
using HouseGarland.Shared.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HouseGarland.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthController(
            ApplicationContext context, 
            IPasswordHasher<User> passwordHasher, 
            IConfiguration configuration,
            IMapper mapper)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }
            var oldUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (oldUser != null)
            {
                throw new Exception("User Already Exist");
            }

            var user = _mapper.Map<User>(dto);
            user.Password = _passwordHasher.HashPassword(user, dto.Password);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        public ActionResult<ResultLoginDto> Login([FromBody] AuthUserDto dto)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == dto.Email);
            if (user != null && _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password) == PasswordVerificationResult.Success)
            {
                var accessToken = GenerateToken(user, DateTime.UtcNow.AddHours(12));
                var refreshToken = GenerateRefreshToken(user);
                return Ok(new ResultLoginDto() { AccessToken = accessToken , RefreshToken =  refreshToken, userDto = _mapper.Map<ResultUserDto>(user) });
            }
            return Unauthorized();
        }

        [HttpPost]
        public ActionResult<ResultLoginDto> RefreshToken([FromBody] string refreshToken)
        {
            var user = _context.Users.FirstOrDefault(x => x.RefreshToken == refreshToken);

            if (user == null || !ValidateRefreshToken(user, refreshToken))
            {
                return Unauthorized(new { message = "Invalid refresh token" });
            }

            var newAccessToken = GenerateToken(user, DateTime.UtcNow.AddHours(12));
            var newRefreshToken = GenerateRefreshToken(user);

            return Ok(new ResultLoginDto() { AccessToken = newAccessToken, RefreshToken = newRefreshToken, userDto = _mapper.Map<ResultUserDto>(user) });
        }

        private bool ValidateRefreshToken(User user, string refreshToken)
        {
            return user.RefreshToken == refreshToken && user.RefreshTokenExpiryTime > DateTime.UtcNow;
        }

        private string GenerateRefreshToken(User user)
        {
            var refreshToken = GenerateToken(user, DateTime.UtcNow.AddDays(7));

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7); 
            _context.SaveChanges();

            return refreshToken;
        }

        private string GenerateToken(User user, DateTime dateTime)
        {
            var jwtConfig = _configuration.GetSection("jwt").Get<JwtConfiguration>();

            var tokenHandler = new JwtSecurityTokenHandler();
            var keyBytes = Encoding.ASCII.GetBytes(jwtConfig.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = jwtConfig.Issuer,
                Audience = jwtConfig.Audience,
                Expires = dateTime,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
