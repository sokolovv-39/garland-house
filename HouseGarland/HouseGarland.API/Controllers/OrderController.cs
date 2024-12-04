using AutoMapper;
using GarlandHouse.DataModel.Entity;
using HouseGarland.BL.Services;
using HouseGarland.Shared.DTO;
using HouseGarland.Shared.DTO.CreateOrder;
using HouseGarland.Shared.DTO.GetOrder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GarlandHouse.API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ActionResult<ResultOrderDto>> GetOrder([FromQuery] int orderId)
        {
            var order = await _orderService.GetOrder(orderId);
            return Ok(order);
        }

        [HttpGet]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ICollection<OrderCard>> GetCardList([FromQuery] int userId)
        {
            return await _orderService.GetOrderList(userId);
        }

        [HttpPost]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ResultOrderDto> SaveOrder([FromBody] CreateOrderDto dto)
        {
            if(dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }   
            return await _orderService.CreateOrUpdateOrder(dto);
        }

        [HttpPost]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<ActionResult<ResultCommentDto>> AddComment([FromBody] AddCommentDto dto)
        {
            if(dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }
            var res = await _orderService.AddComment(dto);
            return Ok(res);
        }

        [HttpDelete]
        [Authorize(Policy = "AccessTokenPolicy")]
        public async Task<IActionResult> DeleteOrder([FromQuery] int orderId)
        {
            await _orderService.DeleteOrder(orderId);
            return Ok();
        }
    }
}
