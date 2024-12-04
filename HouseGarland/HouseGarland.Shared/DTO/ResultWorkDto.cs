using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    public class ResultWorkDto : BaseEntityDto
    {
        public string Comment { get; set; }

        public string Path { get; set; }

        /// <summary>
        /// Идентификатор файла
        /// </summary>
        public int FileEntityId { get; set; }
    }
}
