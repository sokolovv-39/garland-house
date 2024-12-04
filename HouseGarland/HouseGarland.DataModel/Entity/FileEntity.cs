using HouseGarland.DataModel.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Entity
{
    /// <summary>
    /// Сущность для хранения фото и видео в БД
    /// </summary>
    public class FileEntity : EntityBase
    {
        /// <summary>
        /// Имя файла
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Тип файла
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Путь к файлу
        /// </summary>
        public string Path { get; set; }
    }
}
