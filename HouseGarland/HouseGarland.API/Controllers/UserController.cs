using AutoMapper;
using GarlandHouse.API.DTO;
using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GarlandHouse.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;                                                                     
        public UserController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ICollection<ResultUserDto>> GetUsers()
        {
            return await _context.Users
                .Select(x => new ResultUserDto
                {
                    Id = x.Id,
                    FIO = x.FIO,
                    Email = x.Email,
                    Role = x.Role
                })
                .ToListAsync();
        }
    }
}
