using HouseGarland.DataModel.Interfaces;
using HouseGarland.Shared.DTO;
using HouseGarland.Shared.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HouseGarland.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IFileRepository _fileRepository;

        public FileController(IFileService fileService, IFileRepository fileRepository)
        {
            _fileService = fileService;
            _fileRepository = fileRepository;
        }

        [HttpPost]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ResultUploadFileDto> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("File is empty or null.", nameof(file));
            }
            return await _fileService.UploadFile(file);
        }

        [HttpDelete]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<IActionResult> Delete(int fileId)
        {
            try
            {
                await _fileRepository.Delete(fileId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
