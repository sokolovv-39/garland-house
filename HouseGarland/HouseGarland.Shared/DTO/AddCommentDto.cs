using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO
{
    public class AddCommentDto
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
    }
}
