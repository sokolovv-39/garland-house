using HouseGarland.DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultObjectFileDto : BaseResultObjectItemsDto
    {
        /// <summary>
        /// Тип файла
        /// </summary>
        public ObjectFilesTypeEnum TypeEnum { get; set; }

        public string Path { get; set; }

        public int FileEntityId { get; set; }
    }
}
