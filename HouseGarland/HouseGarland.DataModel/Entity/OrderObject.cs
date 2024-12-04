using HouseGarland.DataModel.Entity.ObjectItems;
using HouseGarland.DataModel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GarlandHouse.DataModel.Entity
{
    public class OrderObject : EntityBase, IOrdered
    {
        public OrderObject()
        {
            Fringes = new HashSet<Fringe>();
            Neons = new HashSet<Neon>();
            Threads = new HashSet<HouseGarland.DataModel.Entity.ObjectItems.Thread>();
            ObjectFiles = new HashSet<ObjectFile>();
            BeltLights = new HashSet<BeltLight>();
            Curtains = new HashSet<Curtain>();
            Ropes = new HashSet<Rope>();
            PvsCables = new HashSet<PvsCable>();
            Corrugations = new HashSet<Corrugation>();
            BoxPvsCabels = new HashSet<BoxPvsCabel>();
            Vagies = new HashSet<Vagi>();
            SolderBoxes = new HashSet<SolderBox>();
            Screeds_200 = new HashSet<Screeds_200>();
            Screeds_480_500 = new HashSet<Screeds_480_500>();
            RelaysSwitches = new HashSet<RelaysSwitches>();
            Montages = new HashSet<Montage>();
            ElectricShields = new HashSet<ElectricShield>();
        }

        /// <summary>
        /// Идентификатор версии замера
        /// </summary>
        public int VersionId { get; set; }

        /// <summary>
        /// Ссылка на версия замера
        /// </summary>
        public Version Version { get; set; }

        /// <summary>
        /// Наименование объекта
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Гирлянды с бахромой
        /// </summary>
        public HashSet<Fringe> Fringes { get; set; }

        /// <summary>
        /// Неоновые гирлянды
        /// </summary>
        public HashSet<Neon> Neons { get; set; }

        /// <summary>
        /// Нити
        /// </summary>
        public HashSet<HouseGarland.DataModel.Entity.ObjectItems.Thread> Threads { get; set; }

        /// <summary>
        /// Белт-лайты
        /// </summary>
        public HashSet<BeltLight> BeltLights { get; set; }

        /// <summary>
        /// Занавесы
        /// </summary>
        public HashSet<Curtain> Curtains { get; set; }

        /// <summary>
        /// Тросы
        /// </summary>
        public HashSet<Rope> Ropes { get; set; }

        /// <summary>
        /// Кабели ПВС
        /// </summary>
        public HashSet<PvsCable> PvsCables { get; set; }

        /// <summary>
        /// Гофры для кабелей ПВС
        /// </summary>
        public HashSet<Corrugation> Corrugations { get; set; }

        /// <summary>
        /// Кабель-каналы (коробы) для кабеля ПВС
        /// </summary>
        public HashSet<BoxPvsCabel> BoxPvsCabels { get; set; }

        /// <summary>
        /// Клеммы
        /// </summary>
        public HashSet<Vagi> Vagies { get; set; }

        /// <summary>
        /// Распаячные коробки
        /// </summary>
        public HashSet<SolderBox> SolderBoxes { get; set; }

        /// <summary>
        /// Стяжки 480-500мм
        /// </summary>
        public HashSet<Screeds_480_500> Screeds_480_500 { get; set; }

        /// <summary>
        /// Стяжки 200мм
        /// </summary>
        public HashSet<Screeds_200> Screeds_200 { get; set; }

        /// <summary>
        /// Реле и выключатели
        /// </summary>
        public HashSet<RelaysSwitches> RelaysSwitches { get; set; }

        /// <summary>
        /// Монтаж и логистика
        /// </summary>
        public HashSet<Montage> Montages { get; set; }

        /// <summary>
        /// Электрические щитки
        /// </summary>
        public HashSet<ElectricShield> ElectricShields { get; set; }

        /// <summary>
        /// Фото и видео объекта
        /// </summary>
        public HashSet<ObjectFile> ObjectFiles { get; set; }

        /// <inheritdoc/>
        public int Order { get; set; }
    }
}
