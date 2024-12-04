using GarlandHouse.DataModel.Enums;
using HouseGarland.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Entity
{
    public class Order : EntityBase
    {
        public Order()
        {
            Versions = new HashSet<Version>();
            UserOrders = new HashSet<UserOrder>();
            Comments = new HashSet<Comment>();
            Reports = new HashSet<Report>();
        }

        /// <summary>
		/// Статус заказа
		/// </summary>
        public OrderStatus Status { get; set; }

        /// <summary>
		/// ФИО заказчика
		/// </summary>
        public string CustomerFIO { get; set; }

        /// <summary>
		/// Телефон заказчика
		/// </summary>
        public string CustomerPhone { get; set; }

        /// <summary>
		/// Адресс
		/// </summary>
        public string Address { get; set; }

        /// <summary>
		/// Ссылка на яндексы карты
		/// </summary>
        public string LinkToYandexMap { get; set; }

        /// <summary>
		/// Номер контракта
		/// </summary>
        public string? ContractNumber { get; set; }

        /// <summary>
		/// Ссылка на AmoCRM
		/// </summary>
        public string LinkToAmoCRM { get; set; }

        /// <summary>
		/// Дата и время замера
		/// </summary>
        public DateTime MeasurementDate { get; set; }

        /// <summary>
		/// Способ оплаты замера
		/// </summary>
        public PaymentMethodForMeasurement PaymentMethodForMeasurement { get; set; }

        /// <summary>
		/// Стоимость замера
		/// </summary>
        public int PriceForMeasurement { get; set; }

        /// <summary>
		/// Комментарий к замеру
		/// </summary>
        public string MeasurementComment { get; set; }

        /// <summary>
		/// Дата и время создания
		/// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
		/// Дата и время обновления
		/// </summary>
        public DateTime UpdatedDate { get; set; }
        public HashSet<Version> Versions { get; set; }

        /// <summary>
        /// Участники заказа
        /// </summary>
        public HashSet<UserOrder> UserOrders { get; set; }

        /// <summary>
        /// Комментарии
        /// </summary>
        public HashSet<Comment> Comments { get; set; }

        /// <summary>
        /// Отчеты
        /// </summary>
        public HashSet<Report> Reports { get; set; }
    }
}
