using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateMontageDto : BaseCreateObjectItemDto
    {
        /// <summary>
        /// Автовышка 16-20 метров (смена)
        /// </summary>
        public int Autotower_16_20m { get; set; }

        /// <summary>
        /// Автовышка 22-24 метров (смена)
        /// </summary>
        public int Autotower_22_24m { get; set; }

        /// <summary>
        /// Автовышка 26-36 метров (смена)
        /// </summary>
        public int Autotower_26_36m { get; set; }

        /// <summary>
        /// Автовышка почасовая, часы
        /// </summary>
        public int AutotowerByHours { get; set; }

        /// <summary>
        /// Монтаж оборудования с выездом, км
        /// </summary>
        public int AutotowerMobileKm { get; set; }

        /// <summary>
        /// Сложный монтаж бахромы, метры
        /// </summary>
        public int MontageFringe { get; set; }

        /// <summary>
        /// Сложный монтаж неона, метры
        /// </summary>
        public int MontageNeon { get; set; }

        /// <summary>
        /// Сложный монтаж нити, метры
        /// </summary>
        public int MontageThread { get; set; }

        /// <summary>
        /// Альпинист (смена), руб
        /// </summary>
        public int Climber { get; set; }
    }
}
