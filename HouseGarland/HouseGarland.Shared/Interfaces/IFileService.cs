using HouseGarland.Shared.DTO;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.Interfaces
{
    public interface IFileService
    {
        Task<ResultUploadFileDto> UploadFile(IFormFile file);
    }
}
