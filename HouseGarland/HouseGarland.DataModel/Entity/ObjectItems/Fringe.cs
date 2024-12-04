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
    /// Бахрома
    /// </summary>
    public class Fringe : BaseObjectItem, IContoured, ILengthable
    {
        /// <summary>
		/// Тип освещения
		/// </summary>
        public GlowShadeEnum GlowShade { get; set; }

        /// <summary>
		/// Тип cвечения
		/// </summary>
        public GlowModeEnum GlowMode { get; set; }

        /// <summary>
		/// Цвет кабеля
		/// </summary>
        public ColorEnum CableColor { get; set; }

        /// <summary>
		/// Тип крепления
		/// </summary>
        public BracingEnum Bracing { get; set; }

        /// <summary>
		/// Светодиод
		/// </summary>
        public FringeLedEnum Led { get; set; }

        /// <summary>
		/// Поверхность 
		/// </summary>
        public SurfaceEnum? Surface { get; set; }

        /// <summary>
		/// Кратность
		/// </summary>
        public FringeMultiplicityEnum Multiplicity { get; set; }

        /// <summary>
        /// Количество удлинителей
        /// </summary>
        public int ExtenderCount { get; set; }

        /// <summary>
        /// Количество тройников
        /// </summary>
        public int TeeCount { get; set; }

        /// <inheritdoc/>
        public int Length { get; set; }

        /// <summary>
        /// Количество тройников
        /// </summary>
        public int Tees { get; set; }

        /// <summary>
        /// Количество блоков питания
        /// </summary>
        public int PowerUnits { get; set; }

        /// <summary>
        /// Количество удлинителей на 1 метр
        /// </summary>
        public int Extensions1m { get; set; }

        /// <summary>
        /// Количество удлинителей на 3 метра
        /// </summary>
        public int Extensions3m { get; set; }

        /// <summary>
        /// Количество удлинителей на 5 метров
        /// </summary>
        public int Extensions5m { get; set; }

        /// <summary>
        /// Количество удлинителей на 10 метров
        /// </summary>
        public int Extensions10m { get; set; }

        /// <inheritdoc/>
        public int Contours { get; set; }
    }
}
