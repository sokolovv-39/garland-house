using GarlandHouse.DataModel;
using HouseGarland.BL.Services;
using HouseGarland.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;
using HouseGarland.Shared.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HouseGarland.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class GalleryController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IFileRepository _fileRepo;

        public GalleryController(IFileRepository fileRepo, ApplicationContext context)
        {
            _fileRepo = fileRepo;
            _context = context;
        }

        [HttpGet]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ActionResult<ICollection<ResultWorkDto>>> GetWorkList()
        {
            var res = await _context.Works.Select(x => new ResultWorkDto
            {
                Id = x.Id,
                Comment = x.Comment,
                Path = x.FileEntity.Path,
                FileEntityId = x.FileEntity.Id
            })
            .ToListAsync();
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ActionResult<ResultWorkDto>> CreateOrUpdateWork(WorkDto dto)
        {
            if (!dto.Id.HasValue)
            {
                var newWork = new Work
                {
                    FileEntityId = dto.FileEntityId,
                    Comment = dto.Comment,
                };

                _context.Works.Add(newWork);
                await _context.SaveChangesAsync();

                await _context.Entry(newWork).Reference(x => x.FileEntity).LoadAsync();

                return Ok(new ResultWorkDto
                {
                    Id = newWork.Id,
                    Comment = newWork.Comment,
                    Path = newWork.FileEntity.Path
                });
            }
            else
            {
                var existingWork = await _context.Works
                    .Include(x => x.FileEntity)
                    .FirstOrDefaultAsync(x => x.Id == dto.Id);

                if (existingWork == null)
                {
                    return NotFound("Work not found");
                }

                var oldFileEntityId = existingWork.FileEntityId;

                existingWork.FileEntityId = dto.FileEntityId;
                existingWork.Comment = dto.Comment;

                if (oldFileEntityId != dto.FileEntityId)
                {
                    await _fileRepo.Delete(oldFileEntityId);
                }

                _context.Works.Update(existingWork);
                await _context.SaveChangesAsync();

                await _context.Entry(existingWork).Reference(x => x.FileEntity).LoadAsync();

                return Ok(new ResultWorkDto
                {
                    Id = existingWork.Id,
                    Comment = existingWork.Comment,
                    Path = existingWork.FileEntity.Path
                });
            }
        }

        [HttpDelete]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ActionResult> DeleteWork(int workId)
        {
            var work = await _context.Works.FirstOrDefaultAsync(x => x.Id == workId);
            if(work == null)
            {
                return NotFound("Не найден работа с таким Id");
            }
            _context.Works.Remove(work);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
