using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultCorrugationDto : BaseResultObjectItemsDto, ILengthable
    {
        /// <inheritdoc/>
        public int Length { get; set; }

        /// <summary>
        /// Толщина
        /// </summary>
        public ThicknessEnum Thickness { get; set; }

        /// <summary>
		/// Цвет кабеля
		/// </summary>
        public ColorEnum CableColor { get; set; }
    }
}
