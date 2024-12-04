using GarlandHouse.DataModel.Entity;
using HouseGarland.DataModel.Entity;
using HouseGarland.Shared.DTO;
using HouseGarland.Shared.DTO.CreateOrder;
using HouseGarland.Shared.DTO.GetOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.BL.Services
{
    public interface IOrderService
    {
        Task<ResultOrderDto> GetOrder(int orderId);

        Task<ICollection<OrderCard>> GetOrderList(int userId);

        Task<ResultOrderDto> CreateOrUpdateOrder(CreateOrderDto dto);

        Task<ResultCommentDto> AddComment(AddCommentDto dto);

        Task DeleteOrder(int orderId); 

    }
}
