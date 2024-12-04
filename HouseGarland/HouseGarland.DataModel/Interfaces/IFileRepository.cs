using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Repository;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Interfaces
{
    public interface IFileRepository : IDefaultRepository<FileEntity>
    {
        Task<int> UploadFile(IFormFile file);

        Task Delete(int fileId);
    }
}
