using HouseGarland.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultRopeDto : BaseResultObjectItemsDto, ILengthable, IContoured
    {
        /// <inheritdoc/>
        public int Length { get; set; }

        /// <inheritdoc/>
        public int Contours { get; set; }

        /// <summary>
        /// Толщина
        /// </summary>
        public ThicknessEnum Thickness { get; set; }

        /// <summary>
		/// Поверхность 
		/// </summary>
        public SurfaceEnum Surface { get; set; }

        /// <summary>
        /// Количество дуплексных зажимов
        /// </summary>
        public int DuplexClamps { get; set; }

        /// <summary>
        /// Количество талрепов
        /// </summary>
        public int Lanyards { get; set; }
    }
}
