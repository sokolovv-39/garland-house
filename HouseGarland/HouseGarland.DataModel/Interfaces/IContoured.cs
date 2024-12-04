using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Interfaces
{
    public interface IContoured
    {
        /// <summary>
        /// Количество контуров
        /// </summary>
        public int Contours { get; set; }
    }
}
