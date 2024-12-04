using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class BaseResultObjectItemsDto : BaseEntityDto, IOrdered
    {
        /// <inheritdoc/>
        public int Order { get; set; }
    }
}
