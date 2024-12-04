using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateBoxPvsCabelDto : BaseCreateObjectItemDto, ILengthable
    {
        /// <inheritdoc/>
        public int Length { get; set; }

        /// <summary>
		/// Цвет
		/// </summary>
        public ColorEnum Color { get; set; }
    }
}
