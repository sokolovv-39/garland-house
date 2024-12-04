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
    public class ResultNeonDto : BaseResultObjectItemsDto, IContoured, ILengthable
    {
        /// <summary>
        /// Цвет свечения
        /// </summary>
        public GlowShadeEnum GlowShade { get; set; }

        /// <summary>
        /// Толщина
        /// </summary>
        public ThicknessEnum Thickness { get; set; }

        /// <summary>
        /// Покраска профиля
        /// </summary>
        public bool Painting { get; set; }

        /// <summary>
        /// Длина покрашенного профиля
        /// </summary>
        public int? RalLength { get; set; }

        /// <summary>
        /// Длина непокрашенного профиля
        /// </summary>
        public int? NoRalLength { get; set; }

        /// <summary>
        /// Номер Ral
        /// </summary>
        public string? Ral { get; set; }

        /// <summary>
        /// Количество блоков питания
        /// </summary>
        public int PowerUnits { get; set; }

        /// <summary>
        /// Количество соединительных игл
        /// </summary>
        public int Needles { get; set; }

        /// <summary>
        /// На стяжки 200мм?
        /// </summary>
        public bool IsScreeds_200mm { get; set; }

        /// <summary>
        /// Количество соединителей для гибкого неона
        /// </summary>
        public int FlexibleConnector { get; set; }

        /// <inheritdoc/>
        public int Contours { get; set; }

        /// <summary>
        /// Колечиство заглушек
        /// </summary>
        public int Plugs { get; set; }

        /// <inheritdoc/>
        public int Length { get; set; }
    }
}
