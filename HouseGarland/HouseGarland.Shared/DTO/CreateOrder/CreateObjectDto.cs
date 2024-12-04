using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Entity.ObjectItems;
using HouseGarland.DataModel.Interfaces;
using HouseGarland.Shared.DTO;
using Microsoft.AspNetCore.Http;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateObjectDto : IOrdered
    {
        /// <inheritdoc/>
        public int Order { get; set; }

        /// <summary>
        /// Наименование объекта
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Гирлянды
        /// </summary>
        public List<CreateFringeDto> Fringes { get; set; }

        /// <summary>
        /// Неоновые гирлянды
        /// </summary>
        public List<CreateNeonDto> Neons { get; set; }

        /// <summary>
        /// Нити
        /// </summary>
        public List<CreateThreadDto> Threads { get; set; }

        /// <summary>
        /// Белт-лайты
        /// </summary>
        public List<CreateBeltLiteDto> BeltLights { get; set; }

        /// <summary>
        /// Занавесы
        /// </summary>
        public List<CreateCurtainDto> Curtains { get; set; }

        /// <summary>
        /// Тросы
        /// </summary>
        public List<CreateRopeDto> Ropes { get; set; }

        /// <summary>
        /// Кабели ПВС
        /// </summary>
        public List<CreatePvsCabelDto> PvsCables { get; set; }

        /// <summary>
        /// Гофры для кабелей ПВС
        /// </summary>
        public List<CreateCorrugationDto> Corrugations { get; set; }

        /// <summary>
        /// Кабель-каналы (коробы) для кабеля ПВС
        /// </summary>
        public List<CreateBoxPvsCabelDto> BoxPvsCabels { get; set; }

        /// <summary>
        /// Клеммы
        /// </summary>
        public List<CreateVagiDto> Vagies { get; set; }

        /// <summary>
        /// Распаячные коробки
        /// </summary>
        public List<CreateSolderBoxDto> SolderBoxes { get; set; }

        /// <summary>
        /// Стяжки 480-500мм
        /// </summary>
        public List<CreateScreeds_480_500_Dto> Screeds_480_500 { get; set; }

        /// <summary>
        /// Стяжки 200мм
        /// </summary>
        public List<CreateScreeds_200_Dto> Screeds_200 { get; set; }

        /// <summary>
        /// Реле и выключатели
        /// </summary>
        public List<CreateRelaysSwitchesDto> RelaysSwitches { get; set; }

        /// <summary>
        /// Монтаж и логистика
        /// </summary>
        public List<CreateMontageDto> Montages { get; set; }

        /// <summary>
        /// Электрические щитки
        /// </summary>
        public List<CreateElectricShieldDto> ElectricShields { get; set; }

        /// <summary>
        /// Фото и видео объекта
        /// </summary>
        public List<CreateObjectFileDto> ObjectFiles { get; set; }

    }
}
