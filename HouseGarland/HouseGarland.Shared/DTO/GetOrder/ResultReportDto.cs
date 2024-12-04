using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultReportDto : BaseEntityDto
    {
        /// <summary>
        /// Путь к файлу отчета
        /// </summary>
        public string Path { get; set; }

        /// <summary>
        /// Идентификатор файла отчета
        /// </summary>
        public int FileEntityId { get; set; }

        /// <summary>
        /// Имя файла Отчета
        /// </summary>
        public string FileName { get; set; }
    }
}
