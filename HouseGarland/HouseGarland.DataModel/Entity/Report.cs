using GarlandHouse.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity
{
    public class Report : EntityBase
    {
        /// <summary>
        /// Идентификатор заказа
        /// </summary>
        public int OrderId { get; set; }

        /// <summary>
        /// Заказ
        /// </summary>
        public Order Order { get; set; }

        /// <summary>
        /// Идентификатор файла
        /// </summary>
        public int FileEntityId { get; set; }

        /// <summary>
        /// Файл
        /// </summary>
        public FileEntity FileEntity { get; set; }
    }
}
