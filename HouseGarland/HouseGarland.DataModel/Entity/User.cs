using GarlandHouse.DataModel.Enum;
using HouseGarland.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GarlandHouse.DataModel.Entity
{
    public class User : EntityBase
    {
        public User()
        {
            //UserRoles = new HashSet<UserRole>();
            UserOrders = new HashSet<UserOrder>();
        }

        /// <summary>
        /// ФИО сотрудника
        /// </summary>
        public string FIO { get; set; }

        /// <summary>
        /// Уникальный email сотрудника
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Пароль сотрудника
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Regresh токен
        /// </summary>
        public string? RefreshToken { get; set; }

        /// <summary>
        /// Время жизни refresh токена
        /// </summary>
        public DateTime? RefreshTokenExpiryTime { get; set; }

        /// <summary>
        /// Роль сотрудника
        /// </summary>
        public RoleNameEnum Role { get; set; }

        /// <summary>
        /// Заказы, в которых сотрудник принимает участие
        /// </summary>
        public ICollection<UserOrder> UserOrders { get; set; }


        /// <summary>
        /// Комментарии пользователя к заказам
        /// </summary>
        public ICollection<Comment> Comments { get; set; }
    }
}
