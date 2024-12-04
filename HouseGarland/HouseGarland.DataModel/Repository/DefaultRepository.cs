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
    public abstract class DefaultRepository<T> : IDefaultRepository<T> where T : EntityBase
    {
        protected readonly ApplicationContext _context;

        public DefaultRepository(ApplicationContext context)
        {
            _context = context;
        }

        public bool Any(int id)
        {
            return _context.Set<T>().Any(x => x.Id == id);
        }

        public async Task<T?> GetById(int Id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(x => x.Id == Id);
        }
    }
}
