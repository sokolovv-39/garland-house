using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    public class OrderCard
    {
        public int Id { get; set; }
        public OrderStatus Status { get; set; }
        public string CustomerFIO { get; set; }
        public string CustomerPhone { get; set; }
        public string Address { get; set; }
        public string LinkToAmoCRM { get; set; }
        public int? ManagerId { get; set; }
        public int? ExecutorId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? MinBudget { get; set; }
        public int? MaxBudget { get; set; }
    }
}
