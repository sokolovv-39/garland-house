using HouseGarland.DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    public class UploadFileDto
    {
        public string FileName { get; set; }
        public string ContentType { get; set; }
        public string Bytes {  get; set; }

        /// <summary>
        /// Тип файла
        /// </summary>
        public ObjectFilesTypeEnum TypeEnum { get; set; }
    }
}
