using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity.ObjectItems
{
    public class ObjectFile : BaseObjectItem
    {
        /// <summary>
        /// Тип файла
        /// </summary>
        public ObjectFilesTypeEnum TypeEnum { get; set; }

        public FileEntity FileEntity { get; set; }

        public int FileEntityId { get; set; }
    }
}
