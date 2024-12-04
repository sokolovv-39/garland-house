using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    /// <summary>
    /// Дто для возврата данных при загрузку файла на диск
    /// </summary>
    public class ResultUploadFileDto : BaseEntityDto
    {
        /// <summary>
        /// Путь
        /// </summary>
        public string Path { get; set; }
    }
}
