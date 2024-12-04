using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateVersionDto : IOrdered
    {
        /// <inheritdoc/>
        public int Order { get; set; }

        /// <summary>
        /// Бюджет этого варианта
        /// </summary>
        public int Budget { get; set; }

        /// <summary>
        /// Флаг для определения является ли версия заказа избанной
        /// </summary>
        public bool IsFavorite { get; set; }

        /// <summary>
        /// Объекты
        /// </summary>
        public List<CreateObjectDto> Objects { get; set; }
    }
}
