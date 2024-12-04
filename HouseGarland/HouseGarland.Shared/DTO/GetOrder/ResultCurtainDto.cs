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
    public class ResultCurtainDto : BaseResultObjectItemsDto, ICountable, IContoured
    {
        /// <summary>
        /// Размер
        /// </summary>
        public CurtainSizeEnum Size { get; set; }
        /// <summary>
		/// Тип крепления
		/// </summary>
        public BracingEnum Bracing { get; set; }

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
		/// Поверхность 
		/// </summary>
        public SurfaceEnum Surface { get; set; }

        /// <inheritdoc/>
        public int Contours { get; set; }

        /// <inheritdoc/>
        public int Count { get; set; }

        /// <summary>
        /// Количество блоков питания
        /// </summary>
        public int PowerUnits { get; set; }

        /// <summary>
        /// Количество тройников
        /// </summary>
        public int Tees { get; set; }

        /// <summary>
        /// Количество удлинителей на 1 метр
        /// </summary>
        public int Extensions1m { get; set; }

        /// <summary>
        /// Количество удлинителей на 3 метра
        /// </summary>
        public int Extensions3m { get; set; }
    }
}
