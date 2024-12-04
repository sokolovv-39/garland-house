using HouseGarland.DataModel.Enums;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultVagiDto : BaseResultObjectItemsDto, ICountable
    {
        /// <inheritdoc/>
        public int Count { get; set; }

        /// <summary>
        /// Модель клеммы
        /// </summary>
        public VagiModelEnum Model { get; set; }
    }
}
