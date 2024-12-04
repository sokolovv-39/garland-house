using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Repository
{
    public class FileRepository : DefaultRepository<FileEntity>, IFileRepository
    {
        public FileRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task Delete(int fileId)
        {
            var file = await GetById(fileId);

            if (file is null)
            {
                throw new ArgumentException("Не найден файл с таким id");
            }

            File.Delete(file.Path);
            _context.FileEntities.Remove(file);
            await _context.SaveChangesAsync();
        }

        public async Task<int> UploadFile(IFormFile file)
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
                ContentType = file.ContentType,
                Path = filePath
            };

            await _context.AddAsync(fileEntity);
            await _context.SaveChangesAsync();

            return fileEntity.Id;
        }
    }
}
