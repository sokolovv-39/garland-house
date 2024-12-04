using GarlandHouse.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Interfaces
{
    public interface IOrdered
    {
        /// <summary>
        /// Номер по очереди
        /// </summary>
        int Order { get; set; }
    }
}
