using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity.ObjectItems
{
    /// <summary>
    /// Белт-лайт
    /// </summary>
    public class BeltLight : BaseObjectItem, ILengthable, IContoured
    {
        /// <inheritdoc/>
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

        /// <inheritdoc/>
        public int Contours { get; set; }
    }
}
