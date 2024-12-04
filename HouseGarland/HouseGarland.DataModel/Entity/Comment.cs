using GarlandHouse.DataModel.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.DataModel.Entity
{
    public class Comment : EntityBase
    {
        public Order Order { get; set; }

        public int OrderId { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }

        public string Text { get; set; }

        public DateTime CommentDateTime { get; set; }
    }
}
