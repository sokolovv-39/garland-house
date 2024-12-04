using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity.ObjectItems
{
    /// <summary>
    /// Электрический щиток
    /// </summary>
    public class ElectricShield : BaseObjectItem, ICountable
    {
        /// <inheritdoc/>
        public int Count { get; set; }
    }
}
