using GarlandHouse.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity
{
    /// <summary>
    /// Работа из раздела галлерея
    /// </summary>
    public class Work : EntityBase
    {
        /// <summary>
        /// Комментарий
        /// </summary>
        public string Comment { get; set; }

        public int FileEntityId { get; set; }

        /// <summary>
        /// Фотография
        /// </summary>
        public FileEntity FileEntity { get; set; }
    }
}
