using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Repository
{
    public class UserRepository
    {
        private readonly ApplicationContext _context;
        public UserRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int Id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == Id);
        }

        public User? GetById(int Id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == Id);
        }
    }
}
