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
    /// Кабель ПВС
    /// </summary>
    public class PvsCable : BaseObjectItem, ILengthable
    {
        /// <inheritdoc/>
        public int Length { get; set; }

        /// <summary>
		/// Цвет кабеля
		/// </summary>
        public ColorEnum CableColor { get; set; }
    }
}
