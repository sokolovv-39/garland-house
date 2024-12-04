using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultElectricShieldDto : BaseResultObjectItemsDto, ICountable
    {
        /// <inheritdoc/>
        public int Count { get; set; }
    }
}
