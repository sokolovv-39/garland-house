using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseGarland.Shared.DTO.GetOrder
{
    public class ResultCommentDto
    {
        public string Text { get; set; }
        public DateTime CommentDateTime { get; set; }
        public string WriterFIO { get; set; }
    }
}
