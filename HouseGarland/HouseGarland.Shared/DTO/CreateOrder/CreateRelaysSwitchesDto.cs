using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateRelaysSwitchesDto : BaseCreateObjectItemDto
    {
        /// <summary>
        /// Количество беспроводных 1-клавишных
        /// </summary>
        public int Wireless_1 { get; set; }

        /// <summary>
        /// Количество беспроводных 2-клавишных
        /// </summary>
        public int Wireless_2 { get; set; }

        /// <summary>
        /// Количество беспроводных 3-клавишных
        /// </summary>
        public int Wireless_3 { get; set; }

        /// <summary>
        /// Количество беспроводных 1-клавишных WIFI
        /// </summary>
        public int WirelessWifi_1 { get; set; }

        /// <summary>
        /// Количество беспроводных 2-клавишных WIFI
        /// </summary>
        public int WirelessWifi_2 { get; set; }

        /// <summary>
        /// Количество беспроводных 3-клавишных WIFI
        /// </summary>
        public int WirelessWifi_3 { get; set; }

        /// <summary>
        /// Количество астрономических реле
        /// </summary>
        public int AstroRele { get; set; }

        /// <summary>
        /// Количество фотореле
        /// </summary>
        public int PhotoRele { get; set; }

        /// <summary>
        /// Количество обычных 1-клавишных
        /// </summary>
        public int Simple_1 { get; set; }

        /// <summary>
        /// Количество обычных 2-клавишных
        /// </summary>
        public int Simple_2 { get; set; }

        /// <summary>
        /// Реле времени
        /// </summary>
        public int TimeRelay { get; set; }
    }
}
