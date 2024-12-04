using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity.ObjectItems
{
    public abstract class BaseObjectItem : EntityBase, IOrdered
    {
        /// <inheritdoc/>
        public int Order { get; set; }

        /// <summary>
        /// Идентификатор объекта
        /// </summary>
        public int OrderObjectId { get; set; }

        /// <summary>
        /// Объект
        /// </summary>
        public OrderObject OrderObject { get; set; }
    }
}
