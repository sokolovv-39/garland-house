using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class BaseCreateObjectItemDto : IOrdered
    {
        /// <inheritdoc/>
        public int Order { get; set; }
    }
}
