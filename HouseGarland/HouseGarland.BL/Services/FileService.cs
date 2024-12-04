using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;
using HouseGarland.Shared.DTO;
using HouseGarland.Shared.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.BL.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly ApplicationContext _context;

        public FileService(IFileRepository fileRepository, ApplicationContext context)
        {
            _fileRepository = fileRepository;
            _context = context;
        }

        public async Task<ResultUploadFileDto> UploadFile(IFormFile file)
        {
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine("uploads", fileName);

            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileEntity = new FileEntity
            {
                Name = file.FileName,
                ContentType = file.ContentType,
                Path = filePath
            };

            await _context.AddAsync(fileEntity);
            await _context.SaveChangesAsync();

            return new ResultUploadFileDto()
            {
                Id = fileEntity.Id,
                Path = fileEntity.Path
            };
        }
    }
}
