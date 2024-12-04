using GarlandHouse.DataModel.Enums;
using Microsoft.AspNetCore.Http;

namespace HouseGarland.Shared.DTO.CreateOrder
{
    public class CreateOrderDto
    {
        public int? Id { get; set; }
        public OrderStatus Status { get; set; }

        public string CustomerFIO { get; set; }
        public string CustomerPhone { get; set; }
        public string Address { get; set; }
        public string LinkToYandexMap { get; set; }
        public string? ContractNumber { get; set; }

        public string LinkToAmoCRM { get; set; }

        public DateTime MeasurementDate { get; set; }

        public PaymentMethodForMeasurement PaymentMethodForMeasurement { get; set; }

        public int PriceForMeasurement { get; set; }

        public string MeasurementComment { get; set; }

        public int Budget { get; set; }
        public List<CreateVersionDto> Versions { get; set; }
        public int ManagerId { get; set; }
        public int ExecutorId { get; set; }

        /// <summary>
        /// Отчеты
        /// </summary>
        public ICollection<CreateReportDto> Reports { get; set; }

    }
}
