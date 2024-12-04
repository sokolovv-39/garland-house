using AutoMapper;
using GarlandHouse.DataModel;
using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel.Enum;
using HouseGarland.DataModel.Entity;
using HouseGarland.DataModel.Interfaces;
using HouseGarland.DataModel.Repository;
using HouseGarland.Shared.DTO;
using HouseGarland.Shared.DTO.CreateOrder;
using HouseGarland.Shared.DTO.GetOrder;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Formatters;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.BL.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;
        private readonly OrderRepository _orderRepository;
        private readonly UserRepository _userReporistory;
        private readonly IFileRepository _fileRepository;
        private readonly string BASE_ORDERS_PATH = "uploads/orders";

        public OrderService(
            ApplicationContext context,
            IMapper mapper,
            OrderRepository orderRepository,
            UserRepository userRepository,
            IFileRepository fileRepository)
        {
            _context = context;
            _mapper = mapper;
            _orderRepository = orderRepository;
            _userReporistory = userRepository;
            _fileRepository = fileRepository;
        }

        public async Task<ResultCommentDto> AddComment(AddCommentDto dto)
        {
            var user = await _userReporistory.GetByIdAsync(dto.UserId);
            if(user == null)
            {
                throw new Exception("Такой пользователь не существует");
            }
            var order = await _orderRepository.GetOrderByIdAsync(dto.OrderId);
            if(order == null)
            {
                throw new Exception("Такой заказ не существует");
            }
            var comment = _mapper.Map<Comment>(dto);
            await _orderRepository.AddComment(comment);
            return _mapper.Map<ResultCommentDto>(comment);
        }

        public async Task<ResultOrderDto> CreateOrUpdateOrder(CreateOrderDto dto)
        {
            Order order = null;

            User? manager = null, executor = null;

           
            manager = await _userReporistory.GetByIdAsync(dto.ManagerId);
            if (manager == null || manager.Role != RoleNameEnum.Manager)
            {
                throw new Exception("Такой менеджер не существует");
            }

            executor = await _userReporistory.GetByIdAsync(dto.ExecutorId);
            if (executor == null || executor.Role != RoleNameEnum.Executor)
            {
                throw new Exception("Такой исполнитель не существует");
            }

            if (dto.Id.HasValue && _orderRepository.Any(dto.Id.Value))
            {
                order = await _orderRepository.GetOrderByIdAsync(dto.Id.Value);

                _mapper.Map(dto, order);
            }
            else
            {
                order = _mapper.Map<Order>(dto);
            }

            foreach(var version in order.Versions)
            {
                foreach(var obj in version.Objects)
                {
                    foreach(var objFile in obj.ObjectFiles)
                    {
                        objFile.FileEntity = await _fileRepository.GetById(objFile.FileEntityId);
                    }
                }
            }

            order.UserOrders.Clear();
            order.UserOrders.Add(new UserOrder { UserId = dto.ManagerId, OrderId = order.Id });
            order.UserOrders.Add(new UserOrder { UserId = dto.ExecutorId, OrderId = order.Id });

            await _orderRepository.AddOrUpdateAsync(order);

            return _mapper.Map<ResultOrderDto>(order);
        }

        public async Task<ICollection<OrderCard>> GetOrderList(int userId)
        {
            var user = await _userReporistory.GetByIdAsync(userId);
            ICollection<Order> orders;

            if (user.Role == RoleNameEnum.Executor)
            {
                orders = await _orderRepository.GetOrdersByUserId(userId);
            }
            else
            {
                orders = await _orderRepository.GetListAsync();
            }

            var result = _mapper.Map<ICollection<OrderCard>>(orders);
            return result;
        }

        public async Task<ResultOrderDto> GetOrder(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            return _mapper.Map<ResultOrderDto>(order);
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if(order == null)
            {
                throw new ArgumentException("Не найден заказ с таким Id");
            }
            await _orderRepository.DeleteOrder(order);
        }
    }
}
