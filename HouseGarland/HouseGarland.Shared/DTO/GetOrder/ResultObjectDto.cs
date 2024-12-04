using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Entity.ObjectItems;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultObjectDto : IOrdered
    {
        /// <inheritdoc/>
        public int Order { get; set; }

        /// <summary>
        /// Наименование объекта
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Бахрома
        /// </summary>
        public ICollection<ResultFringeDto> Fringes { get; set; }

        /// <summary>
        /// Неон
        /// </summary>
        public ICollection<ResultNeonDto> Neons { get; set; }

        /// <summary>
        /// Нити
        /// </summary>
        public ICollection<ResultThreadDto> Threads { get; set; }

        /// <summary>
        /// Белт-лайт
        /// </summary>
        public ICollection<ResultBeltLightDto> BeltLights { get; set; }

        /// <summary>
        /// ЗанавесЫ
        /// </summary>
        public ICollection<ResultCurtainDto> Curtains { get; set; }

        /// <summary>
        /// Тросы
        /// </summary>
        public ICollection<ResultRopeDto> Ropes { get; set; }

        /// <summary>
        /// ПВС кабели
        /// </summary>
        public ICollection<ResultPvsCableDto> PvsCables { get; set; }

        /// <summary>
        /// Гофры для кабелей ПВС
        /// </summary>
        public ICollection<ResultCorrugationDto> Corrugations { get; set; }

        /// <summary>
        /// Кабель-каналы (коробы) для кабеля ПВС
        /// </summary>
        public ICollection<ResultBoxPvsCableDto> BoxPvsCabels { get; set; }

        /// <summary>
        /// Клеммы
        /// </summary>
        public ICollection<ResultVagiDto> Vagies { get; set; }

        /// <summary>
        /// Распаячные коробки
        /// </summary>
        public ICollection<ResultSolderBoxDto> SolderBoxes { get; set; }

        /// <summary>
        /// Стяжки 200мм
        /// </summary>
        public ICollection<ResultScreed_200_Dto> Screeds_200 { get; set; }

        /// <summary>
        /// Стяжки 480-500мм
        /// </summary>
        public ICollection<ResultScreed_480_500_Dto> Screeds_480_500 { get; set; }

        /// <summary>
        /// Реле и выключатели
        /// </summary>
        public ICollection<ResultRelaysSwitchesDto> RelaysSwitches { get; set; }

        /// <summary>
        /// Монтаж и логистика
        /// </summary>
        public ICollection<ResultMontageDto> Montages { get; set; }

        /// <summary>
        /// Электрические щитки
        /// </summary>
        public ICollection<ResultElectricShieldDto> ElectricShields { get; set; }

        /// <summary>
        /// Фото и видео объекта
        /// </summary>
        public ICollection<ResultObjectFileDto> ObjectFiles { get; set; }
    }
}
