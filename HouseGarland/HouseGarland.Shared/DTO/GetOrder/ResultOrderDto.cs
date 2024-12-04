using GarlandHouse.API.DTO;
using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel.Enums;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultOrderDto : BaseEntityDto
    {
        public OrderStatus Status { get; set; }
        public string CustomerFIO { get; set; }
        public string CustomerPhone { get; set; }
        public string Address { get; set; }
        public string LinkToYandexMap { get; set; }

        public string LinkToYandexDisk { get; set; }
        public string? ContractNumber { get; set; }

        public string LinkToAmoCRM { get; set; }

        public DateTime MeasurementDate { get; set; }

        public PaymentMethodForMeasurement PaymentMethodForMeasurement { get; set; }

        public int PriceForMeasurement { get; set; }

        public string MeasurementComment { get; set; }

        /// <summary>
        /// Версии
        /// </summary>
        public ICollection<ResultVersionDto> Versions { get; set; }

        /// <summary>
        /// Комментарии
        /// </summary>
        public ICollection<ResultCommentDto> Comments { get; set; }

        /// <summary>
        /// Отчеты
        /// </summary>
        public ICollection<ResultReportDto> Reports { get; set; }

        /// <summary>
        /// Данные о менеджере заказа
        /// </summary>
        public int? ManagerId { get; set; }

        /// <summary>
        /// Данные о исполнителе заказа
        /// </summary>
        public int? ExecutorId { get; set; }

    }
}
