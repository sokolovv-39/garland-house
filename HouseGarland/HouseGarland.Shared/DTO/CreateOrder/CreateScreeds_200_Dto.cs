using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateScreeds_200_Dto : BaseCreateObjectItemDto, ICountable
    {
        /// <inheritdoc/>
        public int Count { get; set; }

        /// <summary>
		/// Цвет
		/// </summary>
        public ColorEnum Color { get; set; }
    }
}
