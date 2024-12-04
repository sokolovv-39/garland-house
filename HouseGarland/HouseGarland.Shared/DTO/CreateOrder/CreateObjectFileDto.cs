using HouseGarland.DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateObjectFileDto : BaseCreateObjectItemDto
    {
        /// <summary>
        /// Тип файла
        /// </summary>
        public ObjectFilesTypeEnum TypeEnum { get; set; }

        /// <summary>
        /// Идентификатор файла в хранилище
        /// </summary>
        public int FileEntityId { get; set; }
    }
}
