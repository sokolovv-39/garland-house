using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity.ObjectItems
{
    /// <summary>
    /// Стяжки 480-500мм
    /// </summary>
    public class Screeds_480_500 : BaseObjectItem, ICountable
    {
        /// <inheritdoc/>
        public int Count { get; set; }

        /// <summary>
		/// Цвет
		/// </summary>
        public ColorEnum Color { get; set; }
    }
}
