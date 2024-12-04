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
    /// Кабель-канал (короб) для кабеля ПВС
    /// </summary>
    public class BoxPvsCabel : BaseObjectItem, ILengthable
    {
        /// <inheritdoc/>
        public int Length { get; set; }

        /// <summary>
		/// Цвет
		/// </summary>
        public ColorEnum Color { get; set; }
    }
}
