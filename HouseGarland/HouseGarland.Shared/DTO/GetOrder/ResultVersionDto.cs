using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultVersionDto : IOrdered
    {
        /// <summary>
        /// Бюджет этого варианта
        /// </summary>
        public int Budget { get; set; }

        /// <summary>
        /// Флаг для определения избранной версии заказа
        /// </summary>
        public bool isFavorite { get; set; }

        public ICollection<ResultObjectDto> Objects { get; set; }

        /// <inheritdoc/>
        public int Order { get; set; }
    }
}
