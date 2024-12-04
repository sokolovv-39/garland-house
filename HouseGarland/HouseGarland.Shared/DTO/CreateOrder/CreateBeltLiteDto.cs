using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateBeltLiteDto : BaseCreateObjectItemDto
    {
        /// <summary>
        /// Длина
        /// </summary>
        public int Length { get; set; }

        /// <summary>
        /// Тип освещения
        /// </summary>
        public GlowShadeEnum GlowShade { get; set; }

        /// <summary>
        /// Шаг между цоколями ламп
        /// </summary>
        public BeltLightLampStepEnum LampStep { get; set; }

        /// <summary>
        /// Цвет кабеля
        /// </summary>
        public ColorEnum CableColor { get; set; }

        /// <summary>
        /// Длина кабеля ПВС
        /// </summary>
        public int PvsLength { get; set; }
    }
}
