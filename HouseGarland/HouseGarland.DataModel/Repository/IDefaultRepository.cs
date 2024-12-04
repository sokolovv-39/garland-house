using GarlandHouse.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Repository
{
    public interface IDefaultRepository<T> where T : EntityBase
    {
        bool Any(int Id);

        Task<T?> GetById(int Id);
    }
}
