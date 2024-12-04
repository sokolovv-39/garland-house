using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Entity
{
    public class Version : EntityBase, IOrdered
    {
        public Version()
        {
            Objects = new List<OrderObject>();
        }

        /// <summary>
        /// Бюджет этого варианта
        /// </summary>
        public int Budget { get; set; }
        public int OrderId { get; set; }
        public Order BaseOrder { get; set; }
        public List<OrderObject> Objects { get; set; }

        /// <summary>
        /// Флаг для определения избранной версии заказа
        /// </summary>
        public bool isFavorite { get; set; }

        /// <inheritdoc/>
        public int Order { get; set; }
    }
}
